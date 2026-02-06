using Microsoft.EntityFrameworkCore;
using MissionCtrlApi.Data;
using MissionCtrlApi.Models;
using MissionCtrlApi.DTOs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddDbContext<MissionTaskDbContext>(options =>
    options.UseSqlite("Data Source=missionTasks.db"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS configuration - critical for frontend to connect
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173", "http://localhost:5174")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Ensure database is created on startup and seed if empty
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MissionTaskDbContext>();
    db.Database.EnsureCreated();

    // Seed database if empty
    if (!db.MissionTasks.Any())
    {
        var today = DateTime.UtcNow.Date;

        var seedTasks = new List<MissionTask>
        {
            new MissionTask
            {
                Title = "Plan quarterly review presentation",
                Description = "Prepare slides and metrics for Q2 review meeting",
                Status = MissionTaskStatus.Pending,
                DueDate = today.AddMonths(2),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new MissionTask
            {
                Title = "Complete API documentation",
                Description = "Document all REST endpoints with examples",
                Status = MissionTaskStatus.InProgress,
                DueDate = today.AddDays(42), // 6 weeks
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new MissionTask
            {
                Title = "Submit daily status report",
                Description = "Update team on current progress",
                Status = MissionTaskStatus.InProgress,
                DueDate = today,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new MissionTask
            {
                Title = "Review pull request #42",
                Description = "Code review for authentication feature",
                Status = MissionTaskStatus.Pending,
                DueDate = today.AddDays(-1), // Yesterday
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new MissionTask
            {
                Title = "Deploy staging environment",
                Description = "Push latest changes to staging server",
                Status = MissionTaskStatus.Complete,
                DueDate = today.AddDays(-7), // 1 week ago
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        db.MissionTasks.AddRange(seedTasks);
        db.SaveChanges();
    }
}

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

// API Endpoints

// GET /api/missionTasks - Get all mission tasks
app.MapGet("/api/missionTasks", async (MissionTaskDbContext db) =>
{
    var missionTasks = await db.MissionTasks
        .OrderByDescending(mt => mt.CreatedAt)
        .ToListAsync();

    return Results.Ok(missionTasks.Select(MapToDto));
})
.WithName("GetAllMissionTasks");

// GET /api/missionTasks/{id} - Get single mission task
app.MapGet("/api/missionTasks/{id}", async (Guid id, MissionTaskDbContext db) =>
{
    var missionTask = await db.MissionTasks.FindAsync(id);
    return missionTask is null ? Results.NotFound() : Results.Ok(MapToDto(missionTask));
})
.WithName("GetMissionTaskById");

// POST /api/missionTasks - Create new mission task
app.MapPost("/api/missionTasks", async (CreateUpdateMissionTaskDto dto, MissionTaskDbContext db) =>
{
    var missionTask = new MissionTask
    {
        Title = dto.Title,
        Description = dto.Description ?? string.Empty,
        Status = Enum.Parse<MissionCtrlApi.Models.MissionTaskStatus>(dto.Status),
        DueDate = dto.DueDate,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow
    };

    db.MissionTasks.Add(missionTask);
    await db.SaveChangesAsync();

    return Results.Created($"/api/missionTasks/{missionTask.Id}", MapToDto(missionTask));
})
.WithName("CreateMissionTask");

// PUT /api/missionTasks/{id} - Update existing mission task
app.MapPut("/api/missionTasks/{id}", async (Guid id, CreateUpdateMissionTaskDto dto, MissionTaskDbContext db) =>
{
    var missionTask = await db.MissionTasks.FindAsync(id);
    if (missionTask is null) return Results.NotFound();

    missionTask.Title = dto.Title;
    missionTask.Description = dto.Description ?? string.Empty;
    missionTask.Status = Enum.Parse<MissionCtrlApi.Models.MissionTaskStatus>(dto.Status);
    missionTask.DueDate = dto.DueDate;
    missionTask.UpdatedAt = DateTime.UtcNow;

    await db.SaveChangesAsync();
    return Results.Ok(MapToDto(missionTask));
})
.WithName("UpdateMissionTask");

// DELETE /api/missionTasks/{id} - Delete mission task
app.MapDelete("/api/missionTasks/{id}", async (Guid id, MissionTaskDbContext db) =>
{
    var missionTask = await db.MissionTasks.FindAsync(id);
    if (missionTask is null) return Results.NotFound();

    db.MissionTasks.Remove(missionTask);
    await db.SaveChangesAsync();
    return Results.NoContent();
})
.WithName("DeleteMissionTask");

app.Run();

// Helper function to map entity to DTO
static MissionTaskDto MapToDto(MissionTask missionTask) => new()
{
    Id = missionTask.Id,
    Title = missionTask.Title,
    Description = missionTask.Description,
    Status = missionTask.Status.ToString(),
    DueDate = missionTask.DueDate,
    CreatedAt = missionTask.CreatedAt,
    UpdatedAt = missionTask.UpdatedAt
};
