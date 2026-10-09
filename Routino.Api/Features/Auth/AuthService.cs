using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Routino.Api.Data;
using Routino.Api.Domain;
using Routino.Api.Infrastructure.Sms;
using Routino.Api.Infrastructure.Time;

namespace Routino.Api.Features.Auth;

public sealed class AuthService(AppDbContext db, ISmsSender sms, JwtTokenService tokens)
{
    public const int OtpTtlSeconds = 120;
    private const int MaxAttempts = 5;

    public async Task<(int Status, object Body)> RequestOtpAsync(string? rawMobile, CancellationToken cancellationToken)
    {
        var mobile = MobileNormalizer.Normalize(rawMobile);
        if (mobile is null)
        {
            return (400, new { error = "شماره همراه را با فرمت ۰۹۱۲۱۲۳۴۵۶۷ وارد کنید." });
        }

        var now = DateTime.UtcNow;
        var recent = await db.OtpChallenges
            .Where(x => x.Mobile == mobile && x.Consumed == false && x.ExpiresAt > now)
            .OrderByDescending(x => x.CreatedAt)
            .FirstOrDefaultAsync(cancellationToken);

        if (recent is not null && now - recent.CreatedAt < TimeSpan.FromSeconds(30))
        {
            return (429, new { error = "کد قبلی هنوز معتبر است. کمی صبر کنید و دوباره تلاش کنید." });
        }

        var code = RandomNumberGenerator.GetInt32(100000, 1000000).ToString();
        foreach (var old in await db.OtpChallenges
                     .Where(x => x.Mobile == mobile && x.Consumed == false)
                     .ToListAsync(cancellationToken))
        {
            old.Consumed = true;
        }

        db.OtpChallenges.Add(new OtpChallenge
        {
            Id = Guid.NewGuid(),
            Mobile = mobile,
            CodeHash = Hash(code),
            ExpiresAt = now.AddSeconds(OtpTtlSeconds),
            AttemptCount = 0,
            CreatedAt = now,
            Consumed = false,
        });
        await db.SaveChangesAsync(cancellationToken);

        try
        {
            await sms.SendOtpAsync(mobile, code, cancellationToken);
        }
        catch (Exception)
        {
            return (502, new { error = "ارسال پیامک ناموفق بود. دوباره تلاش کنید." });
        }

        return (200, new { ok = true, expiresInSeconds = OtpTtlSeconds });
    }

    public async Task<(int Status, object Body)> VerifyOtpAsync(string? rawMobile, string? rawCode, CancellationToken cancellationToken)
    {
        var mobile = MobileNormalizer.Normalize(rawMobile);
        var code = IranClock.NormalizeDigits(rawCode ?? "").Trim();
        if (mobile is null || code.Length != 6 || !code.All(char.IsDigit))
        {
            return (400, new { error = "شماره یا کد واردشده معتبر نیست." });
        }

        var now = DateTime.UtcNow;
        var challenge = await db.OtpChallenges
            .Where(x => x.Mobile == mobile && x.Consumed == false)
            .OrderByDescending(x => x.CreatedAt)
            .FirstOrDefaultAsync(cancellationToken);

        if (challenge is null || challenge.ExpiresAt <= now)
        {
            return (400, new { error = "کد منقضی شده است. دوباره درخواست کنید." });
        }

        challenge.AttemptCount++;
        if (challenge.AttemptCount > MaxAttempts)
        {
            challenge.Consumed = true;
            await db.SaveChangesAsync(cancellationToken);
            return (400, new { error = "تعداد تلاش بیش از حد است. کد جدید بگیرید." });
        }

        if (!CryptographicOperations.FixedTimeEquals(
                Encoding.UTF8.GetBytes(challenge.CodeHash),
                Encoding.UTF8.GetBytes(Hash(code))))
        {
            await db.SaveChangesAsync(cancellationToken);
            return (400, new { error = "کد واردشده نادرست است." });
        }

        challenge.Consumed = true;

        var user = await db.Users.FirstOrDefaultAsync(x => x.Mobile == mobile, cancellationToken);
        if (user is null)
        {
            user = new User
            {
                Id = Guid.NewGuid(),
                Mobile = mobile,
                CreatedAt = now,
            };
            db.Users.Add(user);
        }

        await db.SaveChangesAsync(cancellationToken);
        var token = tokens.Create(user);
        return (200, new AuthResponseDto(token, new UserDto(user.Id, user.Mobile, user.CreatedAt)));
    }

    private static string Hash(string code)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(code));
        return Convert.ToHexString(bytes);
    }
}
