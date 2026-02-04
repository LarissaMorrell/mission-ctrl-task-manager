import { MissionTask } from '../types/missionTask';
import { MissionTaskItem } from './MissionTaskItem';

interface MissionTaskListProps {
  missionTasks: MissionTask[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: 'Pending' | 'InProgress' | 'Complete') => void;
}

export function MissionTaskList({ missionTasks, onEdit, onDelete, onStatusChange }: MissionTaskListProps) {
  if (missionTasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No mission tasks yet. Create your first mission task above!</p>
      </div>
    );
  }

  return (
    <div className="mission-task-list">
      {missionTasks.map((missionTask) => (
        <MissionTaskItem
          key={missionTask.id}
          missionTask={missionTask}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
