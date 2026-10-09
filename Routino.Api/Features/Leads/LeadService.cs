using Microsoft.EntityFrameworkCore;
using Routino.Api.Data;
using Routino.Api.Domain;
using Routino.Api.Features.Auth;

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
}
