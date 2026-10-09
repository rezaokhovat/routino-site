using System.Data;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Routino.Api.Data;
using Routino.Api.Domain;
using Routino.Api.Infrastructure.Time;

namespace Routino.Api.Features.Reservations;

public sealed class ReservationService(AppDbContext db)
{
    public static Guid? UserId(ClaimsPrincipal user)
    {
        var raw = user.FindFirstValue(ClaimTypes.NameIdentifier) ?? user.FindFirstValue("sub");
        return Guid.TryParse(raw, out var id) ? id : null;
    }

    public async Task<(int Status, object Body)> CreateAsync(
        Guid userId,
        CreateReservationDto dto,
        CancellationToken cancellationToken)
    {
        if (!DateOnly.TryParse(dto.Date, out var date))
        {
            return (400, new { error = "تاریخ رزرو نامعتبر است." });
        }

        if (dto.StartHour < IranClock.StudioOpenHour
            || dto.EndHour > IranClock.StudioCloseHour
            || dto.EndHour - dto.StartHour < 1)
        {
            return (400, new { error = "بازه باید پیوسته و حداقل یک ساعت، بین ۱۰ تا ۲۲ باشد." });
        }

        var today = IranClock.Today;
        if (date < today || (date == today && dto.StartHour <= IranClock.CurrentHour))
        {
            return (400, new { error = "فقط بازه‌های آینده قابل رزرو هستند." });
        }

        await using var tx = await db.Database.BeginTransactionAsync(IsolationLevel.Serializable, cancellationToken);
        try
        {

            var overlap = await db.Reservations.AnyAsync(
                x => x.Status == ReservationStatus.Confirmed
                     && x.Date == date
                     && x.StartHour < dto.EndHour
                     && dto.StartHour < x.EndHour,
                cancellationToken);

            if (overlap)
            {
                await tx.RollbackAsync(cancellationToken);
                return (409, new { error = "این بازه قبلاً رزرو شده است." });
            }

            var reservation = new Reservation
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Date = date,
                StartHour = dto.StartHour,
                EndHour = dto.EndHour,
                Status = ReservationStatus.Confirmed,
                CreatedAt = DateTime.UtcNow,
            };
            db.Reservations.Add(reservation);
            await db.SaveChangesAsync(cancellationToken);
            await tx.CommitAsync(cancellationToken);
            return (201, ReservationMapper.ToDto(reservation));
        }
        catch
        {
            await tx.RollbackAsync(cancellationToken);
            throw;
        }
    }

    public async Task<IReadOnlyList<ReservationDto>> ListAsync(
        Guid userId,
        string? scope,
        CancellationToken cancellationToken)
    {
        var today = IranClock.Today;
        var hour = IranClock.CurrentHour;
        var query = db.Reservations.AsNoTracking().Where(x => x.UserId == userId);

        query = scope == "history"
            ? query.Where(x =>
                x.Status != ReservationStatus.Confirmed
                || x.Date < today
                || (x.Date == today && x.EndHour <= hour))
            : query.Where(x =>
                x.Status == ReservationStatus.Confirmed
                && (x.Date > today || (x.Date == today && x.EndHour > hour)));

        var items = await query
            .OrderBy(x => x.Date)
            .ThenBy(x => x.StartHour)
            .ToListAsync(cancellationToken);

        if (scope == "history")
        {
            items = items
                .OrderByDescending(x => x.Date)
                .ThenByDescending(x => x.StartHour)
                .ToList();
        }

        return items.Select(ReservationMapper.ToDto).ToList();
    }

    public async Task<(int Status, object Body)> CancelAsync(
        Guid userId,
        Guid id,
        CancellationToken cancellationToken)
    {
        var reservation = await db.Reservations.FirstOrDefaultAsync(
            x => x.Id == id && x.UserId == userId,
            cancellationToken);

        if (reservation is null)
        {
            return (404, new { error = "رزرو پیدا نشد." });
        }

        if (reservation.Status != ReservationStatus.Confirmed)
        {
            return (400, new { error = "این رزرو قابل لغو نیست." });
        }

        var today = IranClock.Today;
        if (reservation.Date < today
            || (reservation.Date == today && reservation.StartHour <= IranClock.CurrentHour))
        {
            return (400, new { error = "فقط رزروهای آینده قابل لغو هستند." });
        }

        reservation.Status = ReservationStatus.Cancelled;
        await db.SaveChangesAsync(cancellationToken);
        return (200, ReservationMapper.ToDto(reservation));
    }

    public async Task<int> CompleteElapsedAsync(CancellationToken cancellationToken)
    {
        var today = IranClock.Today;
        var hour = IranClock.CurrentHour;
        var items = await db.Reservations
            .Where(x => x.Status == ReservationStatus.Confirmed
                        && (x.Date < today || (x.Date == today && x.EndHour <= hour)))
            .ToListAsync(cancellationToken);

        foreach (var item in items)
        {
            item.Status = ReservationStatus.Completed;
        }

        if (items.Count > 0)
        {
            await db.SaveChangesAsync(cancellationToken);
        }

        return items.Count;
    }
}
