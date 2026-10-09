namespace Routino.Api.Domain;

public sealed class User
{
    public Guid Id { get; set; }
    public required string Mobile { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    public ICollection<BusinessSupportLead> BusinessSupportLeads { get; set; } = new List<BusinessSupportLead>();
}
