/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactElement;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  hint,
  children,
  className = "",
}) => {
  const childClassName = (children.props as any).className || "";
  const isTextarea = children.type === "textarea";

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-sm font-bold text-brand-dark flex items-center justify-between">
          <span className="flex items-center gap-1">
            {label}
            {required && <span className="text-red-500 font-bold">*</span>}
          </span>
          {hint && <span className="text-xs font-normal text-slate-400">{hint}</span>}
        </label>
      )}
      
      {React.cloneElement(children, {
        className: `${childClassName} w-full px-4 ${
          isTextarea ? "py-3 min-h-[120px]" : "h-12 py-2.5"
        } border rounded-lg text-sm sm:text-base transition-all bg-white text-brand-dark placeholder-slate-400 focus:ring-2 focus:ring-brand-navy/15 focus:border-brand-navy ${
          error
            ? "border-red-300 focus:ring-red-100 focus:border-red-500"
            : "border-[#DCE3EA] hover:border-slate-400"
        }`,
      } as any)}

      {error && <span className="text-xs font-medium text-red-500 mt-0.5">{error}</span>}
    </div>
  );
};
