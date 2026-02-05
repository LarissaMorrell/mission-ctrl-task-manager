import { ReactNode } from 'react';
import '@/components/atoms/buttons/CircleButton.css';

interface CircleButtonProps {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
}

export function CircleButton({ children, onClick, ariaLabel }: CircleButtonProps) {
  return (
    <button className="circle-button" onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
