namespace Routino.Api.Infrastructure.Sms;

public sealed class KavenegarOptions
{
    public const string SectionName = "KavenegarSettings";

    public string ApiKey { get; set; } = "";
    public string SenderNumber { get; set; } = "";
    public string Template { get; set; } = "";
}
