import { CheckCircleIcon, Loader2Icon, TriangleAlertIcon } from "lucide-react";

export type StatusType = 'idle' | 'loading' | 'success' | 'error';

export interface StatusMessageProps {
  type: StatusType;
  message?: string;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ type, message }) => {
  if (type === 'idle') return null;

  const statusConfig = {
    success: {
      icon: CheckCircleIcon,
      className: "bg-green-100 text-green-700",
    },
    error: {
      icon: TriangleAlertIcon,
      className: "bg-destructive/15 text-destructive",
    },
  };

  if (type === 'loading') {
    return (
      <div className="flex items-center gap-3 rounded-md bg-blue-100 p-3 text-sm text-blue-700">
        <Loader2Icon className="size-4 animate-spin shrink-0" />
        请稍后...
      </div>
    );
  }

  const config = statusConfig[type];
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-3 rounded-md p-3 text-sm ${config.className}`}>
      <Icon className="size-4 shrink-0" />
      {message}
    </div>
  );
}; 