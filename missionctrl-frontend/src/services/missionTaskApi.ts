import { MissionTask, CreateUpdateMissionTask } from '@/types/missionTask';

const API_BASE_URL = 'http://localhost:5242/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.status === 204 ? (null as T) : response.json();
}

export const missionTaskApi = {
  getAll: async (): Promise<MissionTask[]> => {
    const response = await fetch(`${API_BASE_URL}/missionTasks`);
    return handleResponse<MissionTask[]>(response);
  },

  getById: async (id: number): Promise<MissionTask> => {
    const response = await fetch(`${API_BASE_URL}/missionTasks/${id}`);
    return handleResponse<MissionTask>(response);
  },

  create: async (missionTask: CreateUpdateMissionTask): Promise<MissionTask> => {
    const response = await fetch(`${API_BASE_URL}/missionTasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(missionTask),
    });
    return handleResponse<MissionTask>(response);
  },

  update: async (id: number, missionTask: CreateUpdateMissionTask): Promise<MissionTask> => {
    const response = await fetch(`${API_BASE_URL}/missionTasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(missionTask),
    });
    return handleResponse<MissionTask>(response);
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/missionTasks/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<void>(response);
  },
};
