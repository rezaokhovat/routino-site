namespace Routino.Api.Features.Auth;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/auth");

        group.MapPost("/otp/request", async (OtpRequestDto body, AuthService auth, CancellationToken ct) =>
        {
            var (status, payload) = await auth.RequestOtpAsync(body.Mobile, ct);
            return Results.Json(payload, statusCode: status);
        });

        group.MapPost("/otp/verify", async (OtpVerifyDto body, AuthService auth, CancellationToken ct) =>
        {
            var (status, payload) = await auth.VerifyOtpAsync(body.Mobile, body.Code, ct);
            return Results.Json(payload, statusCode: status);
        });
    }
}
