namespace Routino.Api.Features.Auth;

public sealed class AdminOptions
{
    public const string SectionName = "Admin";

    public string Mobile { get; set; } = "09167777064";

    public bool IsAdmin(string? mobile) =>
        MobileNormalizer.Normalize(mobile) is { } normalized
        && normalized == MobileNormalizer.Normalize(Mobile);
}
