import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all-custom focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary: "bg-brand-navy hover:bg-brand-navy-light text-white focus:ring-brand-navy",
    secondary: "bg-brand-green hover:bg-brand-green-light text-white focus:ring-brand-green",
    outline: "border border-brand-border text-brand-dark hover:bg-brand-bg focus:ring-brand-navy bg-white",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600",
    ghost: "text-brand-navy hover:bg-brand-navy/5 focus:ring-brand-navy",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin me-2" />}
      {!isLoading && leftIcon && <span className="me-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ms-2">{rightIcon}</span>}
    </button>
  );
};
