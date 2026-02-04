import { useState } from 'react';
import { useMissionTasks } from './hooks/useMissionTasks';
import { MissionTaskForm } from './components/MissionTaskForm';
import { MissionTaskList } from './components/MissionTaskList';
import { ErrorMessage } from './components/ErrorMessage';
import './App.css';

function App() {
  const { missionTasks, loading, error, createMissionTask, updateMissionTask, deleteMissionTask } = useMissionTasks();
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = async (missionTask: any) => {
    if (editingId) {
      await updateMissionTask(editingId, missionTask);
      setEditingId(null);
    } else {
      await createMissionTask(missionTask);
    }
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStatusChange = async (id: number, status: 'Pending' | 'InProgress' | 'Complete') => {
    const missionTask = missionTasks.find((mt) => mt.id === id);
    if (missionTask) {
      await updateMissionTask(id, {
        title: missionTask.title,
        description: missionTask.description,
        status,
        dueDate: missionTask.dueDate,
      });
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>MissionCtrl Task Manager</h1>
        <p>Simple and effective mission task management</p>
      </header>

      <main className="app-main">
        {error && <ErrorMessage message={error} />}

        <MissionTaskForm
          onSubmit={handleSubmit}
          editingMissionTask={missionTasks.find((mt) => mt.id === editingId)}
          onCancel={() => setEditingId(null)}
        />

        {loading ? (
          <div className="loading">Loading mission tasks...</div>
        ) : (
          <MissionTaskList
            missionTasks={missionTasks}
            onEdit={handleEdit}
            onDelete={deleteMissionTask}
            onStatusChange={handleStatusChange}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Built with React, TypeScript, and .NET Core</p>
      </footer>
    </div>
  );
}

export default App;
