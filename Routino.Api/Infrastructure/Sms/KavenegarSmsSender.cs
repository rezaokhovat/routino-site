using Kavenegar;
using Kavenegar.Exceptions;
using Microsoft.Extensions.Options;

namespace Routino.Api.Infrastructure.Sms;

public sealed class KavenegarSmsSender(
    IOptions<KavenegarOptions> options,
    IHostEnvironment environment,
    ILogger<KavenegarSmsSender> logger) : ISmsSender
{
    public Task SendOtpAsync(string mobile, string code, CancellationToken cancellationToken)
    {
        var settings = options.Value;
        if (string.IsNullOrWhiteSpace(settings.ApiKey))
        {
            if (environment.IsDevelopment())
            {
                logger.LogWarning("Kavenegar API key is not set. OTP for {Mobile} is {Code}", mobile, code);
                return Task.CompletedTask;
            }

            throw new InvalidOperationException("Kavenegar API key is not configured.");
        }

        return Task.Run(() => Send(mobile, code, settings), cancellationToken);
    }

    private void Send(string mobile, string code, KavenegarOptions settings)
    {
        try
        {
            var api = new KavenegarApi(settings.ApiKey.Trim());
            if (!string.IsNullOrWhiteSpace(settings.Template))
            {
                api.VerifyLookup(mobile, code, settings.Template.Trim());
            }
            else
            {
                var sender = settings.SenderNumber.Trim();
                if (string.IsNullOrWhiteSpace(sender))
                {
                    throw new InvalidOperationException("Kavenegar sender number is not configured.");
                }

                api.Send(sender, mobile, $"کد ورود روتینو: {code}");
            }

            logger.LogInformation("Kavenegar OTP sent to {Mobile}", mobile);
        }
        catch (ApiException ex)
        {
            logger.LogError(ex, "Kavenegar API rejected OTP to {Mobile}", mobile);
            throw new InvalidOperationException("ارسال پیامک ناموفق بود.", ex);
        }
        catch (HttpException ex)
        {
            logger.LogError(ex, "Kavenegar HTTP error sending OTP to {Mobile}", mobile);
            throw new InvalidOperationException("ارسال پیامک ناموفق بود.", ex);
        }
    }
}
