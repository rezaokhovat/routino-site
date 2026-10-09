using Microsoft.EntityFrameworkCore;
using Routino.Api.Data;
using Routino.Api.Domain;
using Routino.Api.Infrastructure.Time;

namespace Routino.Api.Features.Schedule;

public sealed class ScheduleService(AppDbContext db)
{
    public async Task<ScheduleResponseDto> GetAsync(int days, CancellationToken cancellationToken)
    {
        days = Math.Clamp(days, 1, 14);
        var today = IranClock.Today;
        var end = today.AddDays(days);
        var reservations = await db.Reservations
            .AsNoTracking()
            .Where(x => x.Status == ReservationStatus.Confirmed && x.Date >= today && x.Date < end)
            .ToListAsync(cancellationToken);

        var result = new List<ScheduleDayDto>(days);
        for (var offset = 0; offset < days; offset++)
        {
            var date = today.AddDays(offset);
            var dayReservations = reservations.Where(x => x.Date == date).ToList();
            result.Add(BuildDay(date, date == today, dayReservations));
        }

        return new ScheduleResponseDto(result);
    }

    private static ScheduleDayDto BuildDay(DateOnly date, bool isToday, List<Reservation> reservations)
    {
        var hours = new bool[IranClock.StudioCloseHour];
        foreach (var reservation in reservations)
        {
            for (var hour = reservation.StartHour; hour < reservation.EndHour; hour++)
            {
                if (hour is >= IranClock.StudioOpenHour and < IranClock.StudioCloseHour)
                {
                    hours[hour] = true;
                }
            }
        }

        var slots = new List<TimeSlotDto>();
        var cursor = IranClock.StudioOpenHour;
        while (cursor < IranClock.StudioCloseHour)
        {
            var booked = hours[cursor];
            var end = cursor + 1;
            while (end < IranClock.StudioCloseHour && hours[end] == booked)
            {
                end++;
            }

            slots.Add(new TimeSlotDto(
                cursor,
                end,
                booked ? "booked" : "available",
                booked ? "رزرو شده" : null));
            cursor = end;
        }

        return new ScheduleDayDto(
            date.ToString("yyyy-MM-dd"),
            date.ToString("yyyy-MM-dd"),
            IranClock.WeekdayName(date),
            IranClock.PersianDateLabel(date),
            isToday,
            Closed: false,
            slots);
    }
}
