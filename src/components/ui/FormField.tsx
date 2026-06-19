import React from "react";

interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactElement;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  children,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-brand-dark flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {/* Inject custom classes or error styling directly on input child */}
      {React.cloneElement(children, {
        className: `${(children.props as any).className || ""} w-full px-3.5 py-2 border rounded-md text-sm transition-all bg-white text-brand-dark placeholder-slate-400 focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy ${
          error
            ? "border-red-300 focus:ring-red-100 focus:border-red-500"
            : "border-brand-border"
        }`,
      } as any)}

      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
};
