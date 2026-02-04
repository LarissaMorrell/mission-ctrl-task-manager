using System.ComponentModel.DataAnnotations;

namespace MissionCtrlApi.DTOs;

public class CreateUpdateMissionTaskDto
{
    [Required(ErrorMessage = "Title is required")]
    [StringLength(200, MinimumLength = 1, ErrorMessage = "Title must be 1-200 characters")]
    public string Title { get; set; } = string.Empty;

    [StringLength(2000, ErrorMessage = "Description cannot exceed 2000 characters")]
    public string? Description { get; set; }

    [Required(ErrorMessage = "Status is required")]
    [RegularExpression("^(Pending|InProgress|Complete)$", ErrorMessage = "Invalid status. Must be Pending, InProgress, or Complete")]
    public string Status { get; set; } = "Pending";

    public DateTime? DueDate { get; set; }
}
