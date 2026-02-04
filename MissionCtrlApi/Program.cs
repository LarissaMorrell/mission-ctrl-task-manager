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

// Ensure database is created on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MissionTaskDbContext>();
    db.Database.EnsureCreated();
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
app.MapGet("/api/missionTasks/{id}", async (int id, MissionTaskDbContext db) =>
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
app.MapPut("/api/missionTasks/{id}", async (int id, CreateUpdateMissionTaskDto dto, MissionTaskDbContext db) =>
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
app.MapDelete("/api/missionTasks/{id}", async (int id, MissionTaskDbContext db) =>
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
