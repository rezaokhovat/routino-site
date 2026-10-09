using Microsoft.Extensions.Options;

namespace Routino.Api.Infrastructure.Sms;

public sealed class KavenegarSmsSender(
    HttpClient http,
    IOptions<KavenegarOptions> options,
    IHostEnvironment environment,
    ILogger<KavenegarSmsSender> logger) : ISmsSender
{
    public async Task SendOtpAsync(string mobile, string code, CancellationToken cancellationToken)
    {
        var settings = options.Value;
        if (string.IsNullOrWhiteSpace(settings.ApiKey))
        {
            if (environment.IsDevelopment())
            {
                logger.LogWarning("Kavenegar API key is not set. OTP for {Mobile} is {Code}", mobile, code);
                return;
            }

            throw new InvalidOperationException("Kavenegar API key is not configured.");
        }

        var encodedKey = Uri.EscapeDataString(settings.ApiKey.Trim());
        var encodedMobile = Uri.EscapeDataString(mobile);
        string url;
        if (!string.IsNullOrWhiteSpace(settings.Template))
        {
            url =
                $"https://api.kavenegar.com/v1/{encodedKey}/verify/lookup.json?receptor={encodedMobile}&token={Uri.EscapeDataString(code)}&template={Uri.EscapeDataString(settings.Template.Trim())}";
        }
        else
        {
            var message = Uri.EscapeDataString($"کد ورود روتینو: {code}");
            var sender = string.IsNullOrWhiteSpace(settings.Sender)
                ? ""
                : $"&sender={Uri.EscapeDataString(settings.Sender.Trim())}";
            url = $"https://api.kavenegar.com/v1/{encodedKey}/sms/send.json?receptor={encodedMobile}&message={message}{sender}";
        }

        using var response = await http.GetAsync(url, cancellationToken);
        var body = await response.Content.ReadAsStringAsync(cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            logger.LogError("Kavenegar request failed ({Status}): {Body}", (int)response.StatusCode, body);
            throw new InvalidOperationException("ارسال پیامک ناموفق بود.");
        }

        logger.LogInformation("Kavenegar OTP sent to {Mobile}", mobile);
    }
}
