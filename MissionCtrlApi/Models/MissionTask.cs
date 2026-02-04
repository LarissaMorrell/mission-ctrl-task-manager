namespace MissionCtrlApi.Models;

public class MissionTask
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public MissionTaskStatus Status { get; set; } = MissionTaskStatus.Pending;
    public DateTime? DueDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public enum MissionTaskStatus
{
    Pending = 0,
    InProgress = 1,
    Complete = 2
}
