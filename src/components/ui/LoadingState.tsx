import React from "react";

interface LoadingStateProps {
  rows?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ rows = 3 }) => {
  return (
    <div className="w-full space-y-4 p-6 bg-white border border-brand-border rounded-lg shadow-xs animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 rounded w-1/6"></div>
          </div>
          <div className="h-2 bg-slate-100 rounded w-full"></div>
          {i < rows - 1 && <div className="border-t border-brand-bg my-2"></div>}
        </div>
      ))}
    </div>
  );
};
