import React from "react";
import { Info } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message: string;
  actionButton?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  actionButton,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-dashed border-brand-border rounded-lg shadow-xs">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-bg text-brand-navy mb-4">
        <Info className="h-6 w-6" />
      </div>
      {title && <h3 className="text-lg font-bold text-brand-dark mb-1">{title}</h3>}
      <p className="text-sm text-brand-muted max-w-sm mb-6">{message}</p>
      {actionButton && <div>{actionButton}</div>}
    </div>
  );
};
