import { ReactNode } from 'react';
import '@/components/atoms/buttons/PrimaryButton.css';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function PrimaryButton({ children, onClick, type = 'button', disabled = false }: PrimaryButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="btn-primary">
      {children}
    </button>
  );
}
