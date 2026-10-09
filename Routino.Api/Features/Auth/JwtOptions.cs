namespace Routino.Api.Features.Auth;

public sealed class JwtOptions
{
    public const string SectionName = "Jwt";

    public string Issuer { get; set; } = "Routino";
    public string Audience { get; set; } = "Routino";
    public string SigningKey { get; set; } = "";
    public int LifetimeDays { get; set; } = 7;
}
