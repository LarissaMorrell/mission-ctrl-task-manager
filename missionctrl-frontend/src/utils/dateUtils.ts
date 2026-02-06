export function formatDate(dateString: string | null): string | null {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString();
}

export function getUrgencyLevel(dateString: string | null): 'overdue' | 'warning' | null {
  if (!dateString) return null;
  const dueDate = new Date(dateString);
  const today = new Date();

  const isSameDay =
    dueDate.getFullYear() === today.getFullYear() &&
    dueDate.getMonth() === today.getMonth() &&
    dueDate.getDate() === today.getDate();

  if (isSameDay) return 'warning';
  if (dueDate < today) return 'overdue';
  return null;
}
