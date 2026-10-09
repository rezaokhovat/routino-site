namespace Routino.Api.Infrastructure.Sms;

public interface ISmsSender
{
    Task SendOtpAsync(string mobile, string code, CancellationToken cancellationToken);
}
