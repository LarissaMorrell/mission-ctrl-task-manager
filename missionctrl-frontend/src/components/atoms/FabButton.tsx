import { ReactNode } from 'react';
import '@/components/atoms/FabButton.css';

interface FabButtonProps {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
}

export function FabButton({ children, onClick, ariaLabel }: FabButtonProps) {
  return (
    <button className="fab" onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
