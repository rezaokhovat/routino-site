namespace Routino.Api.Features.Schedule;

public sealed record TimeSlotDto(int Start, int End, string Status, string? Label);

public sealed record ScheduleDayDto(
    string Id,
    string Date,
    string Weekday,
    string DateLabel,
    bool IsToday,
    bool Closed,
    IReadOnlyList<TimeSlotDto> Slots);

public sealed record ScheduleResponseDto(IReadOnlyList<ScheduleDayDto> Days);
