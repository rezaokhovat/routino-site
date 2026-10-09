namespace Routino.Api.Features.Schedule;

public static class ScheduleEndpoints
{
    public static void MapScheduleEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/schedule", async (int? days, ScheduleService schedule, CancellationToken ct) =>
            Results.Ok(await schedule.GetAsync(days ?? 7, ct)));
    }
}
