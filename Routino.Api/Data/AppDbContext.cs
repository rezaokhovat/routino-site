using Microsoft.EntityFrameworkCore;
using Routino.Api.Domain;

namespace Routino.Api.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<OtpChallenge> OtpChallenges => Set<OtpChallenge>();
    public DbSet<Reservation> Reservations => Set<Reservation>();
    public DbSet<BusinessSupportLead> BusinessSupportLeads => Set<BusinessSupportLead>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.HasIndex(x => x.Mobile).IsUnique();
            entity.Property(x => x.Mobile).HasMaxLength(11).IsRequired();
        });

        modelBuilder.Entity<OtpChallenge>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.HasIndex(x => new { x.Mobile, x.CreatedAt });
            entity.Property(x => x.Mobile).HasMaxLength(11).IsRequired();
            entity.Property(x => x.CodeHash).HasMaxLength(64).IsRequired();
        });

        modelBuilder.Entity<Reservation>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.HasIndex(x => new { x.Date, x.Status });
            entity.HasIndex(x => x.UserId);
            entity.HasOne(x => x.User)
                .WithMany(x => x.Reservations)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<BusinessSupportLead>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.HasIndex(x => x.CreatedAt);
            entity.HasIndex(x => x.Mobile);
            entity.HasIndex(x => x.UserId);
            entity.Property(x => x.JobTitle).HasMaxLength(200).IsRequired();
            entity.Property(x => x.Mobile).HasMaxLength(11).IsRequired();
            entity.Property(x => x.Instagram).HasMaxLength(200).IsRequired();
            entity.Property(x => x.OtherSocials).HasMaxLength(1000);
            entity.HasOne(x => x.User)
                .WithMany(x => x.BusinessSupportLeads)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.SetNull);
        });
    }
}
