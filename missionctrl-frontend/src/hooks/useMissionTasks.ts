import { useState, useEffect } from 'react';
import { MissionTask, CreateUpdateMissionTask } from '@/types/missionTask';
import { missionTaskApi } from '@/services/missionTaskApi';

export function useMissionTasks() {
  const [missionTasks, setMissionTasks] = useState<MissionTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMissionTasks();
  }, []);

  const loadMissionTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await missionTaskApi.getAll();
      setMissionTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load mission tasks');
    } finally {
      setLoading(false);
    }
  };

  const createMissionTask = async (missionTask: CreateUpdateMissionTask) => {
    try {
      const newMissionTask = await missionTaskApi.create(missionTask);
      setMissionTasks(prev => [newMissionTask, ...prev]);
      return newMissionTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create mission task');
      throw err;
    }
  };

  const updateMissionTask = async (id: string, missionTask: CreateUpdateMissionTask) => {
    try {
      const updated = await missionTaskApi.update(id, missionTask);
      setMissionTasks(prev => prev.map(mt => mt.id === id ? updated : mt));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update mission task');
      throw err;
    }
  };

  const deleteMissionTask = async (id: string) => {
    try {
      await missionTaskApi.delete(id);
      setMissionTasks(prev => prev.filter(mt => mt.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete mission task');
      throw err;
    }
  };

  return {
    missionTasks,
    loading,
    error,
    createMissionTask,
    updateMissionTask,
    deleteMissionTask,
    refresh: loadMissionTasks,
  };
}
