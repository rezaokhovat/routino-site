using Routino.Api.Domain;
using Routino.Api.Infrastructure.Time;

namespace Routino.Api.Features.Leads;

public sealed record CreateLeadDto(
    string JobTitle,
    string Mobile,
    string Instagram,
    string? OtherSocials);

public sealed record LeadDto(
    Guid Id,
    string JobTitle,
    string Mobile,
    string Instagram,
    string? OtherSocials,
    DateTime CreatedAt,
    string DateLabel,
    bool LinkedToAccount);

public static class LeadMapper
{
    public static LeadDto ToDto(BusinessSupportLead lead)
    {
        var local = TimeZoneInfo.ConvertTime(
            new DateTimeOffset(DateTime.SpecifyKind(lead.CreatedAt, DateTimeKind.Utc)),
            IranClock.TimeZone);
        return new LeadDto(
            lead.Id,
            lead.JobTitle,
            lead.Mobile,
            lead.Instagram,
            lead.OtherSocials,
            lead.CreatedAt,
            IranClock.PersianDateLabel(DateOnly.FromDateTime(local.DateTime)),
            lead.UserId is not null);
    }
}
