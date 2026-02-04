import '@/components/molecules/ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <span>{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="dismiss-btn">
          ×
        </button>
      )}
    </div>
  );
}
