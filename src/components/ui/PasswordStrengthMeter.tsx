import React from "react";
import { Check, X } from "lucide-react";

interface PasswordStrengthMeterProps {
  password?: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password = "",
}) => {
  const criteria = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Uppercase letter (A-Z)", met: /[A-Z]/.test(password) },
    { label: "Number (0-9)", met: /[0-9]/.test(password) },
    { label: "Special symbol (!@#$%^&*)", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const score = criteria.filter((c) => c.met).length;

  const strengthConfig = [
    { label: "Very Weak", color: "bg-slate-300 dark:bg-slate-700", textColor: "text-slate-500" },
    { label: "Weak", color: "bg-rose-500", textColor: "text-rose-600 dark:text-rose-400" },
    { label: "Fair", color: "bg-amber-500", textColor: "text-amber-600 dark:text-amber-400" },
    { label: "Good", color: "bg-blue-500", textColor: "text-blue-600 dark:text-blue-400" },
    { label: "Strong", color: "bg-emerald-500", textColor: "text-emerald-600 dark:text-emerald-400" },
  ];

  const current = strengthConfig[score];

  if (!password) {
    return null;
  }

  return (
    <div className="mt-2 space-y-2 rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between font-medium">
        <span className="text-slate-600 dark:text-slate-400">Password Strength:</span>
        <span className={current.textColor}>{current.label}</span>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-4 gap-1.5 h-1.5">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`rounded-full transition-all duration-300 ${
              index < score ? current.color : "bg-slate-200 dark:bg-slate-700"
            }`}
          />
        ))}
      </div>

      {/* Requirements checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-slate-600 dark:text-slate-400">
        {criteria.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            {item.met ? (
              <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            ) : (
              <X className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
            )}
            <span className={item.met ? "text-emerald-700 dark:text-emerald-400" : ""}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

