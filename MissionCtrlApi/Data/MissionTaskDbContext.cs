using Microsoft.EntityFrameworkCore;
using MissionCtrlApi.Models;

namespace MissionCtrlApi.Data;

public class MissionTaskDbContext : DbContext
{
    public MissionTaskDbContext(DbContextOptions<MissionTaskDbContext> options)
        : base(options) { }

    public DbSet<MissionTask> MissionTasks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MissionTask>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).HasMaxLength(2000);
            entity.Property(e => e.Status).HasConversion<string>();
        });
    }
}
