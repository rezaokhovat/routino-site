namespace Routino.Api.Domain;

public sealed class OtpChallenge
{
    public Guid Id { get; set; }
    public required string Mobile { get; set; }
    public required string CodeHash { get; set; }
    public DateTime ExpiresAt { get; set; }
    public int AttemptCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool Consumed { get; set; }
}
