import React from "react";
import { Check, User, MapPin, KeyRound, ClipboardCheck } from "lucide-react";
import { StepNumber, StepConfig } from "@/types/form";

interface StepIndicatorProps {
  currentStep: StepNumber;
  completedSteps: number[];
  onStepClick: (step: StepNumber) => void;
}

export const STEPS: StepConfig[] = [
  {
    number: 1,
    id: "personal",
    title: "Personal Information",
    shortTitle: "Personal",
    description: "Name & contact info",
  },
  {
    number: 2,
    id: "address",
    title: "Address Details",
    shortTitle: "Address",
    description: "Location & residency",
  },
  {
    number: 3,
    id: "account",
    title: "Account Credentials",
    shortTitle: "Account",
    description: "Login & security",
  },
  {
    number: 4,
    id: "confirm",
    title: "Confirmation",
    shortTitle: "Review",
    description: "Review & finalize",
  },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  completedSteps,
  onStepClick,
}) => {
  const getIcon = (stepNum: StepNumber) => {
    switch (stepNum) {
      case 1:
        return <User className="h-4 w-4" />;
      case 2:
        return <MapPin className="h-4 w-4" />;
      case 3:
        return <KeyRound className="h-4 w-4" />;
      case 4:
        return <ClipboardCheck className="h-4 w-4" />;
    }
  };

  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full pb-6 mb-8 border-b border-slate-100 dark:border-slate-800/80">
      {/* Percentage Progress Bar */}
      <div className="relative mb-6">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2.5">
          <span className="uppercase tracking-wider">
            Step {currentStep} of {STEPS.length}
          </span>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">
            {Math.round((currentStep / STEPS.length) * 100)}% Complete
          </span>
        </div>
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Circles & Labels */}
      <div className="relative flex items-center justify-between" role="tablist">
        {/* Connecting line behind circles */}
        <div
          className="absolute top-5 left-4 right-4 h-0.5 bg-slate-100 dark:bg-slate-800 -z-0"
          aria-hidden="true"
        >
          <div
            className="h-full bg-indigo-500 transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {STEPS.map((step) => {
          const isCurrent = step.number === currentStep;
          const isCompleted = completedSteps.includes(step.number);
          const isClickable = isCompleted || step.number < currentStep;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center group"
            >
              <button
                type="button"
                role="tab"
                aria-selected={isCurrent}
                aria-current={isCurrent ? "step" : undefined}
                disabled={!isClickable && !isCurrent}
                onClick={() => onStepClick(step.number)}
                className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                  isCurrent
                    ? "bg-indigo-600 text-white ring-4 ring-indigo-500/25 shadow-lg shadow-indigo-500/30 scale-105"
                    : isCompleted
                    ? "bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer shadow-sm"
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-700"
                }`}
                title={
                  isClickable
                    ? `Click to navigate to ${step.title}`
                    : step.title
                }
              >
                {isCompleted && !isCurrent ? (
                  <Check className="h-5 w-5 stroke-[2.5]" />
                ) : (
                  getIcon(step.number)
                )}
              </button>

              {/* Labels below */}
              <div className="mt-2.5 text-center">
                <span
                  className={`block text-xs font-semibold tracking-tight transition-colors ${
                    isCurrent
                      ? "text-indigo-600 dark:text-indigo-400"
                      : isCompleted
                      ? "text-slate-800 dark:text-slate-200"
                      : "text-slate-400 dark:text-slate-600"
                  }`}
                >
                  <span className="hidden sm:inline">{step.title}</span>
                  <span className="sm:hidden">{step.shortTitle}</span>
                </span>
                <span className="hidden md:block text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                  {step.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
