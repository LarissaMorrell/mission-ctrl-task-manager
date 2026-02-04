import '@/components/atoms/AddTaskButton.css';
import AddIcon from '@/components/atoms/AddIcon';
import CloseIcon from '@/components/atoms/CloseIcon';

interface AddTaskButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function AddTaskButton({ isOpen, onClick }: AddTaskButtonProps) {
  return (
    <button
      className="fab"
      onClick={onClick}
      aria-label={isOpen ? 'Close form' : 'Add new mission task'}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isOpen ? <CloseIcon/> : <AddIcon/>}
      </svg>
    </button>
  );
}
