import React, { forwardRef, InputHTMLAttributes } from "react";
import { AlertCircle } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      rightElement,
      id,
      name,
      required,
      className = "",
      ...props
    },
    ref
  ) => {
    const inputId = id || name || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full space-y-2 text-left">
        <label
          htmlFor={inputId}
          className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          <span>
            {label}
            {required && <span className="ml-1 text-rose-500 font-bold">*</span>}
          </span>
          {!required && (
            <span className="text-xs font-normal text-slate-400 dark:text-slate-500">
              Optional
            </span>
          )}
        </label>

        <div className="relative rounded-xl shadow-xs">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={`block w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 dark:bg-slate-900/90 dark:text-white dark:placeholder:text-slate-500 ${
              icon ? "pl-11" : ""
            } ${rightElement ? "pr-11" : ""} ${
              error
                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-500/80"
                : "border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-indigo-400"
            } ${className}`}
            {...props}
          />

          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 pt-0.5"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}

        {!error && helperText && (
          <p
            id={helperId}
            className="text-xs text-slate-500 dark:text-slate-400 pt-0.5"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
