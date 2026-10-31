"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useFormStore } from "@/store/useFormStore";
import { StepIndicator } from "@/components/StepIndicator";
import { Step1PersonalInfo } from "@/components/steps/Step1PersonalInfo";
import { Step2AddressDetails } from "@/components/steps/Step2AddressDetails";
import { Step3AccountCredentials } from "@/components/steps/Step3AccountCredentials";
import { Step4Confirmation } from "@/components/steps/Step4Confirmation";
import { SuccessView } from "@/components/steps/SuccessView";
import { Sparkles, RotateCcw, Shield, CheckCircle } from "lucide-react";

export const MultiStepForm: React.FC = () => {
  const {
    currentStep,
    completedSteps,
    isSubmitted,
    setStep,
    fillDemoData,
    resetForm,
  } = useFormStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Client-side hydration safety for Zustand localStorage
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 10);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full max-w-2xl mx-auto rounded-3xl border border-slate-200/80 bg-white/80 p-8 sm:p-10 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 animate-pulse">
        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-md mx-auto mb-6" />
        <div className="h-10 w-full bg-slate-100 dark:bg-slate-800/60 rounded-xl mb-8" />
        <div className="space-y-4">
          <div className="h-12 w-full bg-slate-100 dark:bg-slate-800/40 rounded-xl" />
          <div className="h-12 w-full bg-slate-100 dark:bg-slate-800/40 rounded-xl" />
          <div className="h-12 w-full bg-slate-100 dark:bg-slate-800/40 rounded-xl" />
        </div>
      </div>
    );
  }

  // Smooth fade and subtle vertical transition (prevents horizontal clipping)
  const stepVariants: Variants = {
    enter: {
      opacity: 0,
      y: 12,
    },
    center: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -12,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Top Helper Toolbar (Autofill Demo Data, Reset) */}
      <div className="mb-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <div className="flex items-center gap-2 font-medium">
          <Shield className="h-4 w-4 text-indigo-500 shrink-0" />
          <span>Secure Registration Flow</span>
        </div>
        <div className="flex items-center gap-2">
          {!isSubmitted && (
            <button
              type="button"
              onClick={fillDemoData}
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50/80 px-3 py-1.5 font-medium text-indigo-700 hover:bg-indigo-100 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/80 transition-colors shadow-2xs cursor-pointer"
              title="Autofill all fields with valid test data"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span>Autofill Demo</span>
            </button>
          )}
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/60 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
            title="Reset form to initial empty state"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Glassmorphic Card Container */}
      <div className="relative rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-10 shadow-2xl backdrop-blur-xl dark:border-slate-800/90 dark:bg-slate-900/90 transition-all">
        {/* Glow accents */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />

        {!isSubmitted ? (
          <>
            {/* Step Indicator Header */}
            <StepIndicator
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={(step) => {
                // Allow jumping only if step is already completed or previous
                if (completedSteps.includes(step) || step <= currentStep) {
                  setStep(step);
                }
              }}
            />

            {/* Step Content with Smooth Animation */}
            <div className="relative w-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentStep}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  {currentStep === 1 && <Step1PersonalInfo />}
                  {currentStep === 2 && <Step2AddressDetails />}
                  {currentStep === 3 && <Step3AccountCredentials />}
                  {currentStep === 4 && <Step4Confirmation />}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        ) : (
          <SuccessView />
        )}
      </div>

      {/* Footer Info / Accessibility Badge */}
      <div className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500 flex flex-wrap items-center justify-center gap-3">
        <span className="flex items-center gap-1.5">
          <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
          React-Hook-Form &amp; Zod Validation
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="flex items-center gap-1.5">
          <CheckCircle className="h-3.5 w-3.5 text-indigo-500" />
          Zustand Global &amp; Persistent State
        </span>
      </div>
    </div>
  );
};
