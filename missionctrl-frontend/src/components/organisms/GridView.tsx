import { MissionTask, MissionTaskStatus } from '@/types/missionTask';
import { MissionTaskItem } from '@/components/molecules/MissionTaskItem';
import '@/components/organisms/GridView.css';

interface GridViewProps {
  missionTasks: MissionTask[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: MissionTaskStatus) => void;
}

export function GridView({ missionTasks, onEdit, onDelete, onStatusChange }: GridViewProps) {
  const pendingTasks = missionTasks.filter((t) => t.status === 'Pending');
  const inProgressTasks = missionTasks.filter((t) => t.status === 'InProgress');
  const completeTasks = missionTasks.filter((t) => t.status === 'Complete');

  return (
    <div className="grid-view">
      <div className="grid-column column-pending">
        <h3 className="column-header">Pending</h3>
        <div className="column-tasks">
          {pendingTasks.map((task) => (
            <MissionTaskItem
              key={task.id}
              missionTask={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
          {pendingTasks.length === 0 && <p className="column-empty">No pending tasks</p>}
        </div>
      </div>

      <div className="grid-column column-inprogress">
        <h3 className="column-header">In Progress</h3>
        <div className="column-tasks">
          {inProgressTasks.map((task) => (
            <MissionTaskItem
              key={task.id}
              missionTask={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
          {inProgressTasks.length === 0 && <p className="column-empty">No tasks in progress</p>}
        </div>
      </div>

      <div className="grid-column column-complete">
        <h3 className="column-header">Complete</h3>
        <div className="column-tasks">
          {completeTasks.map((task) => (
            <MissionTaskItem
              key={task.id}
              missionTask={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
          {completeTasks.length === 0 && <p className="column-empty">No completed tasks</p>}
        </div>
      </div>
    </div>
  );
}
