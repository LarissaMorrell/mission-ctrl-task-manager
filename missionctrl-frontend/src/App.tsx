import { useState } from 'react';
import { CreateUpdateMissionTask, MissionTaskStatus } from '@/types/missionTask';
import { useMissionTasks } from '@/hooks/useMissionTasks';
import { MissionTaskForm } from '@/components/organisms/MissionTaskForm';
import { MissionTaskList } from '@/components/molecules/MissionTaskList';
import { GridView } from '@/components/organisms/GridView';
import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { CircleButton } from '@/components/atoms/buttons/CircleButton';
import { AddIcon } from '@/components/atoms/icons';
import '@/App.css';

function App() {
  const { missionTasks, loading, error, createMissionTask, updateMissionTask, deleteMissionTask } = useMissionTasks();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const handleSubmit = async (missionTask: CreateUpdateMissionTask) => {
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

  const handleStatusChange = async (id: number, status: MissionTaskStatus) => {
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

      {!isFormVisible && (
        <CircleButton onClick={toggleFormVisibility} ariaLabel="Add new mission task">
          <AddIcon />
        </CircleButton>
      )}

      <main className="app-main">
        {error && <ErrorMessage message={error} />}

        {/* View Toggle */}
        <div className="view-toggle">
          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
          <button
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
          >
            Board
          </button>
        </div>

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
        {loading ? (
          <div className="loading">Loading mission tasks...</div>
        ) : viewMode === 'list' ? (
          <MissionTaskList
            missionTasks={missionTasks}
            onEdit={handleEdit}
            onDelete={deleteMissionTask}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <GridView
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
