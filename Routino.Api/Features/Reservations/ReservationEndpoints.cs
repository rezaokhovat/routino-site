using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Routino.Api.Data;
using Routino.Api.Features.Auth;

namespace Routino.Api.Features.Reservations;

public static class ReservationEndpoints
{
    public static void MapReservationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/reservations").RequireAuthorization();

        group.MapPost("/", async (
            CreateReservationDto body,
            ReservationService service,
            ClaimsPrincipal user,
            CancellationToken ct) =>
        {
            var userId = ReservationService.UserId(user);
            if (userId is null) return Results.Unauthorized();
            var (status, payload) = await service.CreateAsync(userId.Value, body, ct);
            return Results.Json(payload, statusCode: status);
        });

        group.MapGet("/", async (
            [FromQuery] string? scope,
            ReservationService service,
            ClaimsPrincipal user,
            CancellationToken ct) =>
        {
            var userId = ReservationService.UserId(user);
            if (userId is null) return Results.Unauthorized();
            return Results.Ok(await service.ListAsync(userId.Value, scope, ct));
        });

        group.MapPost("/{id:guid}/cancel", async (
            Guid id,
            ReservationService service,
            ClaimsPrincipal user,
            CancellationToken ct) =>
        {
            var userId = ReservationService.UserId(user);
            if (userId is null) return Results.Unauthorized();
            var (status, payload) = await service.CancelAsync(userId.Value, id, ct);
            return Results.Json(payload, statusCode: status);
        });
    }

    public static void MapMeEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/me", async (
            AppDbContext db,
            ClaimsPrincipal user,
            IOptions<AdminOptions> admin,
            CancellationToken ct) =>
        {
            var userId = ReservationService.UserId(user);
            if (userId is null) return Results.Unauthorized();
            var found = await db.Users.FindAsync([userId.Value], ct);
            if (found is null) return Results.Unauthorized();
            return Results.Ok(new
            {
                found.Id,
                found.Mobile,
                found.CreatedAt,
                IsAdmin = admin.Value.IsAdmin(found.Mobile),
            });
        }).RequireAuthorization();
    }
}
