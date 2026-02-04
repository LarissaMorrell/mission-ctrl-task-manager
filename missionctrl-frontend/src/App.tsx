import { useState } from 'react';
import { useMissionTasks } from '@/hooks/useMissionTasks';
import { MissionTaskForm } from '@/components/MissionTaskForm';
import { MissionTaskList } from '@/components/molecules/MissionTaskList';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { AddTaskButton } from '@/components/atoms/AddTaskButton';
import '@/App.css';

function App() {
  const { missionTasks, loading, error, createMissionTask, updateMissionTask, deleteMissionTask } = useMissionTasks();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = async (missionTask: any) => {
    if (editingId) {
      await updateMissionTask(editingId, missionTask);
      setEditingId(null);
      setIsFormVisible(false);
    } else {
      await createMissionTask(missionTask);
      setIsFormVisible(false);
    }
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelForm = () => {
    setEditingId(null);
    setIsFormVisible(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

      <AddTaskButton isOpen={isFormVisible} onClick={toggleFormVisibility} />

      <main className="app-main">
        {error && <ErrorMessage message={error} />}

        {/* Mission Task Form - Conditionally Rendered */}
        {isFormVisible && (
          <div className="form-container">
            <MissionTaskForm
              onSubmit={handleSubmit}
              editingMissionTask={missionTasks.find((mt) => mt.id === editingId)}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {/* Mission Task List */}
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
