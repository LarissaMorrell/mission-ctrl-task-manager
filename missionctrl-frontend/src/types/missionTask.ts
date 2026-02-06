export type MissionTaskStatus = 'Pending' | 'InProgress' | 'Complete';

export interface MissionTask {
  id: string;
  title: string;
  description: string;
  status: MissionTaskStatus;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUpdateMissionTask {
  title: string;
  description?: string;
  status: MissionTaskStatus;
  dueDate?: string | null;
}
