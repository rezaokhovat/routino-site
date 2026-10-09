namespace Routino.Api.Infrastructure.Sms;

public sealed class KavenegarOptions
{
    public const string SectionName = "Kavenegar";

    public string ApiKey { get; set; } = "";
    public string Sender { get; set; } = "";
    public string Template { get; set; } = "";
}
