using System.Text.RegularExpressions;
using Routino.Api.Infrastructure.Time;

namespace Routino.Api.Features.Auth;

public static partial class MobileNormalizer
{
    public static string? Normalize(string? raw)
    {
        if (string.IsNullOrWhiteSpace(raw)) return null;

        var digits = IranClock.NormalizeDigits(raw).Trim();
        digits = digits.Replace(" ", "").Replace("-", "");
        if (digits.StartsWith("+98", StringComparison.Ordinal)) digits = "0" + digits[3..];
        else if (digits.StartsWith("0098", StringComparison.Ordinal)) digits = "0" + digits[4..];
        else if (digits.StartsWith("98", StringComparison.Ordinal) && digits.Length == 12) digits = "0" + digits[2..];

        return MobilePattern().IsMatch(digits) ? digits : null;
    }

    [GeneratedRegex("^09\\d{9}$")]
    private static partial Regex MobilePattern();
}
