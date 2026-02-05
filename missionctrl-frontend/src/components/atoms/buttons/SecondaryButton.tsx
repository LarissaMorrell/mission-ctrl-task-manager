import { ReactNode } from 'react';
import '@/components/atoms/buttons/SecondaryButton.css';

interface SecondaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function SecondaryButton({ children, onClick, type = 'button' }: SecondaryButtonProps) {
  return (
    <button type={type} onClick={onClick} className="btn-secondary">
      {children}
    </button>
  );
}
