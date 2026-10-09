namespace Routino.Api.Domain;

public sealed class BusinessSupportLead
{
    public Guid Id { get; set; }
    public Guid? UserId { get; set; }
    public required string JobTitle { get; set; }
    public required string Mobile { get; set; }
    public required string Instagram { get; set; }
    public string? OtherSocials { get; set; }
    public DateTime CreatedAt { get; set; }

    public User? User { get; set; }
}
