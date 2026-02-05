import { useState, useEffect } from 'react';
import { MissionTaskStatus } from '@/types/missionTask';
import { MissionTask, CreateUpdateMissionTask } from '@/types/missionTask';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import '@/components/organisms/MissionTaskForm.css';

interface MissionTaskFormProps {
  onSubmit: (missionTask: CreateUpdateMissionTask) => Promise<void>;
  editingMissionTask?: MissionTask;
  onCancel?: () => void;
}

export function MissionTaskForm({ onSubmit, editingMissionTask, onCancel }: MissionTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<MissionTaskStatus>('Pending');
  const [dueDate, setDueDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingMissionTask) {
      setTitle(editingMissionTask.title);
      setDescription(editingMissionTask.description);
      setStatus(editingMissionTask.status);
      setDueDate(editingMissionTask.dueDate ? editingMissionTask.dueDate.split('T')[0] : '');
    } else {
      resetForm();
    }
  }, [editingMissionTask]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('Pending');
    setDueDate('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        status,
        dueDate: dueDate || null,
      });
      if (!editingMissionTask) {
        resetForm();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mission-task-form">
      <h2>{editingMissionTask ? 'Edit Mission Task' : 'Add New Mission Task'}</h2>

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter mission task title"
          maxLength={200}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter mission task description (optional)"
          maxLength={2000}
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as MissionTaskStatus)}
          >
            <option value="Pending">Pending</option>
            <option value="InProgress">In Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        <PrimaryButton type="submit" disabled={submitting || !title.trim()}>
          {submitting ? 'Saving...' : editingMissionTask ? 'Update' : 'Add Mission Task'}
        </PrimaryButton>
        {editingMissionTask && onCancel && (
          <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
        )}
      </div>
    </form>
  );
}
