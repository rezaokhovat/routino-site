using Routino.Api.Domain;

namespace Routino.Api.Features.Reservations;

public sealed record CreateReservationDto(string Date, int StartHour, int EndHour);

public sealed record ReservationDto(
    Guid Id,
    string Date,
    int StartHour,
    int EndHour,
    string Status,
    DateTime CreatedAt,
    string Weekday,
    string DateLabel);

public static class ReservationMapper
{
    public static ReservationDto ToDto(Reservation reservation) =>
        new(
            reservation.Id,
            reservation.Date.ToString("yyyy-MM-dd"),
            reservation.StartHour,
            reservation.EndHour,
            reservation.Status.ToString().ToLowerInvariant(),
            reservation.CreatedAt,
            Infrastructure.Time.IranClock.WeekdayName(reservation.Date),
            Infrastructure.Time.IranClock.PersianDateLabel(reservation.Date));
}
