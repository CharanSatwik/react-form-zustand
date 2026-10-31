import React, { forwardRef, SelectHTMLAttributes } from "react";
import { AlertCircle, ChevronDown, Globe } from "lucide-react";

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: readonly { readonly code?: string; readonly name?: string; readonly value?: string; readonly label?: string }[] | Option[];
  error?: string;
  helperText?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      placeholder = "Select an option",
      id,
      name,
      required,
      className = "",
      ...props
    },
    ref
  ) => {
    const selectId = id || name || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
      <div className="w-full space-y-2 text-left">
        <label
          htmlFor={selectId}
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
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
            <Globe className="h-4 w-4" />
          </div>

          <select
            ref={ref}
            id={selectId}
            name={name}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={`block w-full appearance-none rounded-xl border bg-white pl-11 pr-10 py-3 text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 dark:bg-slate-900/90 dark:text-white ${
              error
                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-500/80"
                : "border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-indigo-400"
            } ${className}`}
            {...props}
          >
            <option value="" disabled className="text-slate-400">
              {placeholder}
            </option>
            {options.map((opt) => {
              const val = "value" in opt && opt.value !== undefined ? opt.value : "name" in opt ? opt.name : "";
              const text = "label" in opt && opt.label !== undefined ? opt.label : "name" in opt ? opt.name : "";
              return (
                <option key={val} value={val} className="text-slate-900 dark:bg-slate-900 dark:text-white">
                  {text}
                </option>
              );
            })}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 dark:text-slate-500">
            <ChevronDown className="h-4 w-4" />
          </div>
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

Select.displayName = "Select";
