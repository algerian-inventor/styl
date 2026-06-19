import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  colorClass?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  colorClass = "text-brand-navy bg-brand-navy/5 border-brand-navy/10",
}) => {
  return (
    <div className="bg-white border border-brand-border rounded-lg p-6 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
          {title}
        </span>
        <div className="text-2xl font-bold text-brand-dark">{value}</div>
        
        {trend && (
          <div className="flex items-center gap-1 text-xs">
            <span
              className={trend.isPositive ? "text-green-600 font-medium" : "text-red-600 font-medium"}
            >
              {trend.isPositive ? "+" : "-"}
              {trend.value}
            </span>
            <span className="text-brand-muted">{description || "since last month"}</span>
          </div>
        )}
        {!trend && description && (
          <p className="text-xs text-brand-muted">{description}</p>
        )}
      </div>

      <div className={`p-3 rounded-lg border ${colorClass}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  );
};
