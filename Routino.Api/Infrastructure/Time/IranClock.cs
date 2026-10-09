using System.Globalization;

namespace Routino.Api.Infrastructure.Time;

public static class IranClock
{
    public const int StudioOpenHour = 10;
    public const int StudioCloseHour = 22;

    public static TimeZoneInfo TimeZone { get; } = Resolve();

    public static DateTimeOffset Now => TimeZoneInfo.ConvertTime(DateTimeOffset.UtcNow, TimeZone);

    public static DateOnly Today => DateOnly.FromDateTime(Now.DateTime);

    public static int CurrentHour => Now.Hour;

    private static readonly string[] PersianMonths =
    [
        "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
        "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
    ];

    private static readonly string[] Weekdays =
    [
        "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه",
    ];

    public static string WeekdayName(DateOnly date) =>
        Weekdays[(int)date.ToDateTime(TimeOnly.MinValue).DayOfWeek];

    public static string PersianDateLabel(DateOnly date)
    {
        var calendar = new PersianCalendar();
        var dt = date.ToDateTime(TimeOnly.MinValue);
        var day = calendar.GetDayOfMonth(dt);
        var month = calendar.GetMonth(dt);
        return $"{ToPersianDigits(day)} {PersianMonths[month - 1]}";
    }

    public static string ToPersianDigits(int value) => ToPersianDigits(value.ToString(CultureInfo.InvariantCulture));

    public static string ToPersianDigits(string value) =>
        value
            .Replace('0', '۰').Replace('1', '۱').Replace('2', '۲').Replace('3', '۳').Replace('4', '۴')
            .Replace('5', '۵').Replace('6', '۶').Replace('7', '۷').Replace('8', '۸').Replace('9', '۹');

    public static string NormalizeDigits(string value)
    {
        var chars = value.ToCharArray();
        for (var i = 0; i < chars.Length; i++)
        {
            chars[i] = chars[i] switch
            {
                >= '۰' and <= '۹' => (char)('0' + (chars[i] - '۰')),
                >= '٠' and <= '٩' => (char)('0' + (chars[i] - '٠')),
                _ => chars[i],
            };
        }

        return new string(chars);
    }

    private static TimeZoneInfo Resolve()
    {
        foreach (var id in new[] { "Iran Standard Time", "Asia/Tehran", "Asia/Teheran" })
        {
            try
            {
                return TimeZoneInfo.FindSystemTimeZoneById(id);
            }
            catch (TimeZoneNotFoundException)
            {
            }
            catch (InvalidTimeZoneException)
            {
            }
        }

        return TimeZoneInfo.CreateCustomTimeZone("Iran", TimeSpan.FromHours(3.5), "Iran", "Iran");
    }
}
