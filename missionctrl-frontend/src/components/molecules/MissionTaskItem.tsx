import { MissionTask } from '@/types/missionTask';

interface MissionTaskItemProps {
  missionTask: MissionTask;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: 'Pending' | 'InProgress' | 'Complete') => void;
}

export function MissionTaskItem({ missionTask, onEdit, onDelete, onStatusChange }: MissionTaskItemProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this mission task?')) {
      onDelete(missionTask.id);
    }
  };

  const getStatusClass = (status: string) => {
    return `status-${status.toLowerCase()}`;
  };

  return (
    <div className={`mission-task-item ${getStatusClass(missionTask.status)}`}>
      <div className="mission-task-header">
        <h3>{missionTask.title}</h3>
        <div className="mission-task-actions">
          <button onClick={() => onEdit(missionTask.id)} className="btn-edit">
            Edit
          </button>
          <button onClick={handleDelete} className="btn-delete">
            Delete
          </button>
        </div>
      </div>

      {missionTask.description && (
        <p className="mission-task-description">{missionTask.description}</p>
      )}

      <div className="mission-task-meta">
        <div className="status-selector">
          <label>Status:</label>
          <select
            value={missionTask.status}
            onChange={(e) =>
              onStatusChange(missionTask.id, e.target.value as 'Pending' | 'InProgress' | 'Complete')
            }
            className={getStatusClass(missionTask.status)}
          >
            <option value="Pending">Pending</option>
            <option value="InProgress">In Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </div>

        {missionTask.dueDate && (
          <div className="due-date">
            <strong>Due:</strong> {formatDate(missionTask.dueDate)}
          </div>
        )}
      </div>

      <div className="mission-task-footer">
        <small>Created: {formatDate(missionTask.createdAt)}</small>
      </div>
    </div>
  );
}
