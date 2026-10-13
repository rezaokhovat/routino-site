using Microsoft.EntityFrameworkCore;
using Routino.Api.Data;
using Routino.Api.Domain;
using Routino.Api.Features.Auth;
using Routino.Api.Infrastructure.Time;

namespace Routino.Api.Features.Leads;

public sealed class LeadService(AppDbContext db)
{
    public async Task<(int Status, object Body)> CreateAsync(
        CreateLeadDto dto,
        Guid? userId,
        CancellationToken cancellationToken)
    {
        var job = (dto.JobTitle ?? "").Trim();
        if (job.Length is < 2 or > 200)
        {
            return (400, new { error = "عنوان شغلی را وارد کنید." });
        }

        var mobile = MobileNormalizer.Normalize(dto.Mobile);
        if (mobile is null)
        {
            return (400, new { error = "شماره همراه را با فرمت ۰۹۱۲۱۲۳۴۵۶۷ وارد کنید." });
        }

        var instagram = (dto.Instagram ?? "").Trim();
        if (instagram.Length is < 2 or > 200)
        {
            return (400, new { error = "آدرس اینستاگرام را وارد کنید." });
        }

        var other = string.IsNullOrWhiteSpace(dto.OtherSocials) ? null : dto.OtherSocials.Trim();
        if (other is { Length: > 1000 })
        {
            return (400, new { error = "توضیح صفحه‌های دیگر کوتاه‌تر باشد." });
        }

        Guid? linkedUserId = null;
        if (userId is not null)
        {
            var exists = await db.Users.AnyAsync(x => x.Id == userId.Value, cancellationToken);
            if (exists) linkedUserId = userId;
        }

        var lead = new BusinessSupportLead
        {
            Id = Guid.NewGuid(),
            UserId = linkedUserId,
            JobTitle = job,
            Mobile = mobile,
            Instagram = instagram,
            OtherSocials = other,
            CreatedAt = DateTime.UtcNow,
        };
        db.BusinessSupportLeads.Add(lead);
        await db.SaveChangesAsync(cancellationToken);
        return (201, LeadMapper.ToDto(lead));
    }

    public async Task<IReadOnlyList<LeadDto>> ListMineAsync(Guid userId, CancellationToken cancellationToken)
    {
        var items = await db.BusinessSupportLeads
            .AsNoTracking()
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync(cancellationToken);
        return items.Select(LeadMapper.ToDto).ToList();
    }

    public async Task<IReadOnlyList<LeadDto>> ListAllAsync(string? query, CancellationToken cancellationToken)
    {
        var items = db.BusinessSupportLeads.AsNoTracking();
        var term = (query ?? "").Trim();
        if (term.Length > 0)
        {
            var digits = IranClock.NormalizeDigits(term).Replace(" ", "");
            items = items.Where(x =>
                x.JobTitle.Contains(term)
                || x.Mobile.Contains(digits)
                || x.Instagram.Contains(term)
                || (x.OtherSocials != null && x.OtherSocials.Contains(term)));
        }

        var list = await items
            .OrderByDescending(x => x.Starred)
            .ThenByDescending(x => x.CreatedAt)
            .ToListAsync(cancellationToken);
        return list.Select(LeadMapper.ToDto).ToList();
    }

    public async Task<(int Status, object Body)> ToggleStarAsync(Guid id, CancellationToken cancellationToken)
    {
        var lead = await db.BusinessSupportLeads.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (lead is null)
        {
            return (404, new { error = "این درخواست پیدا نشد." });
        }

        lead.Starred = !lead.Starred;
        await db.SaveChangesAsync(cancellationToken);
        return (200, LeadMapper.ToDto(lead));
    }

    public async Task<(int Status, object Body)> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var lead = await db.BusinessSupportLeads.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (lead is null)
        {
            return (404, new { error = "این درخواست پیدا نشد." });
        }

        db.BusinessSupportLeads.Remove(lead);
        await db.SaveChangesAsync(cancellationToken);
        return (200, new { ok = true });
    }
}
