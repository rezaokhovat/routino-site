using Microsoft.EntityFrameworkCore;
using Routino.Api.Data;

namespace Routino.Api.Features.Health;

public static class HealthEndpoints
{
    public static void MapHealthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/health", async (AppDbContext db, CancellationToken ct) =>
        {
            var databaseOk = await db.Database.CanConnectAsync(ct);
            if (!databaseOk)
            {
                return Results.Json(
                    new { status = "unhealthy", database = "unavailable" },
                    statusCode: StatusCodes.Status503ServiceUnavailable);
            }

            return Results.Ok(new { status = "healthy", database = "ok" });
        });
    }
}
