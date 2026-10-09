using System.Security.Claims;
using Routino.Api.Features.Reservations;

namespace Routino.Api.Features.Leads;

public static class LeadEndpoints
{
    public static void MapLeadEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/business-support");

        group.MapPost("/", async (
            CreateLeadDto body,
            LeadService service,
            ClaimsPrincipal user,
            CancellationToken ct) =>
        {
            var (status, payload) = await service.CreateAsync(body, ReservationService.UserId(user), ct);
            return Results.Json(payload, statusCode: status);
        });

        group.MapGet("/mine", async (
            LeadService service,
            ClaimsPrincipal user,
            CancellationToken ct) =>
        {
            var userId = ReservationService.UserId(user);
            if (userId is null) return Results.Unauthorized();
            return Results.Ok(await service.ListMineAsync(userId.Value, ct));
        }).RequireAuthorization();
    }
}
