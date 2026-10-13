using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Routino.Api.Data;
using Routino.Api.Features.Auth;
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

        group.MapGet("/admin", async (
            [FromQuery] string? q,
            LeadService service,
            AppDbContext db,
            ClaimsPrincipal user,
            IOptions<AdminOptions> admin,
            CancellationToken ct) =>
        {
            var denied = await RejectIfNotAdmin(db, user, admin, ct);
            if (denied is not null) return denied;
            return Results.Ok(await service.ListAllAsync(q, ct));
        }).RequireAuthorization();

        group.MapPost("/admin/{id:guid}/star", async (
            Guid id,
            LeadService service,
            AppDbContext db,
            ClaimsPrincipal user,
            IOptions<AdminOptions> admin,
            CancellationToken ct) =>
        {
            var denied = await RejectIfNotAdmin(db, user, admin, ct);
            if (denied is not null) return denied;
            var (status, payload) = await service.ToggleStarAsync(id, ct);
            return Results.Json(payload, statusCode: status);
        }).RequireAuthorization();

        group.MapDelete("/admin/{id:guid}", async (
            Guid id,
            LeadService service,
            AppDbContext db,
            ClaimsPrincipal user,
            IOptions<AdminOptions> admin,
            CancellationToken ct) =>
        {
            var denied = await RejectIfNotAdmin(db, user, admin, ct);
            if (denied is not null) return denied;
            var (status, payload) = await service.DeleteAsync(id, ct);
            return Results.Json(payload, statusCode: status);
        }).RequireAuthorization();
    }

    private static async Task<IResult?> RejectIfNotAdmin(
        AppDbContext db,
        ClaimsPrincipal user,
        IOptions<AdminOptions> admin,
        CancellationToken ct)
    {
        var userId = ReservationService.UserId(user);
        if (userId is null) return Results.Unauthorized();
        var found = await db.Users.FindAsync([userId.Value], ct);
        if (found is null || !admin.Value.IsAdmin(found.Mobile))
        {
            return Results.Json(new { error = "دسترسی ادمین ندارید." }, statusCode: StatusCodes.Status403Forbidden);
        }

        return null;
    }
}
