using Routino.Api.Features.Reservations;
using Routino.Api.Infrastructure.Time;

namespace Routino.Api.Infrastructure.Jobs;

public sealed class ReservationMaintenanceService(
    IServiceScopeFactory scopes,
    ILogger<ReservationMaintenanceService> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await RunOnce(stoppingToken);

        while (!stoppingToken.IsCancellationRequested)
        {
            var delay = DelayUntilNextRun();
            logger.LogInformation("Next reservation maintenance in {Delay}", delay);
            try
            {
                await Task.Delay(delay, stoppingToken);
            }
            catch (OperationCanceledException)
            {
                return;
            }

            await RunOnce(stoppingToken);
        }
    }

    private async Task RunOnce(CancellationToken stoppingToken)
    {
        try
        {
            await using var scope = scopes.CreateAsyncScope();
            var service = scope.ServiceProvider.GetRequiredService<ReservationService>();
            var count = await service.CompleteElapsedAsync(stoppingToken);
            logger.LogInformation("Marked {Count} reservations as completed", count);
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            logger.LogError(ex, "Reservation maintenance failed");
        }
    }

    private static TimeSpan DelayUntilNextRun()
    {
        var now = IranClock.Now.DateTime;
        var todayRun = now.Date.AddHours(0).AddMinutes(5);
        var next = now < todayRun ? todayRun : now.Date.AddDays(1).AddMinutes(5);
        var delay = next - now;
        return delay < TimeSpan.FromSeconds(1) ? TimeSpan.FromSeconds(1) : delay;
    }
}
