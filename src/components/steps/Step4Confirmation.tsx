import React, { useState } from "react";
import { useFormStore } from "@/store/useFormStore";
import { Button } from "@/components/ui/Button";
import {
  User,
  Mail,
  Phone,
  Home,
  Building2,
  MapPin,
  Globe,
  AtSign,
  Lock,
  Edit2,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import confetti from "canvas-confetti";

export const Step4Confirmation: React.FC = () => {
  const { formData, setStep, prevStep, submitForm } = useFormStore();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [showPasswordPreview, setShowPasswordPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { personalInfo, addressDetails, accountCredentials } = formData;

  const handleFinalSubmit = () => {
    if (!agreedToTerms) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    setIsSubmitting(true);

    setTimeout(() => {
      submitForm();
      setIsSubmitting(false);

      // Trigger celebratory confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"],
      });
    }, 600);
  };

  return (
    <div className="space-y-6 text-left" aria-label="Registration Review & Confirmation">
      <div className="space-y-1.5 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Review & Confirmation
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Please review your details carefully before submitting your registration.
        </p>
      </div>

      <div className="space-y-4">
        {/* Section 1: Personal Information Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 transition-all dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/70 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
              <User className="h-4 w-4 text-indigo-500" />
              <span>Personal Information</span>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline cursor-pointer"
            >
              <Edit2 className="h-3 w-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div>
              <span className="block text-slate-400 dark:text-slate-500 font-medium mb-0.5">
                Full Name
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm">
                {personalInfo.fullName || "—"}
              </span>
            </div>
            <div>
              <span className="block text-slate-400 dark:text-slate-500 font-medium mb-0.5">
                Email Address
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                {personalInfo.email || "—"}
              </span>
            </div>
            <div>
              <span className="block text-slate-400 dark:text-slate-500 font-medium mb-0.5">
                Phone Number
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                {personalInfo.phone || "Not provided (optional)"}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Address Details Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 transition-all dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/70 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
              <MapPin className="h-4 w-4 text-indigo-500" />
              <span>Address Details</span>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline cursor-pointer"
            >
              <Edit2 className="h-3 w-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div className="sm:col-span-2">
              <span className="block text-slate-400 dark:text-slate-500 font-medium mb-0.5">
                Street Address
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center gap-1.5">
                <Home className="h-3.5 w-3.5 text-slate-400" />
                {addressDetails.streetAddress || "—"}
              </span>
            </div>
            <div>
              <span className="block text-slate-400 dark:text-slate-500 font-medium mb-0.5">
                City
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-slate-400" />
                {addressDetails.city || "—"}
              </span>
            </div>
            <div>
              <span className="block text-slate-400 dark:text-slate-500 font-medium mb-0.5">
                Zip Code
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm">
                {addressDetails.zipCode || "—"}
              </span>
            </div>
            <div>
              <span className="block text-slate-400 dark:text-slate-500 font-medium mb-0.5">
                Country
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-slate-400" />
                {addressDetails.country || "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Account Credentials Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 transition-all dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/70 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
              <Lock className="h-4 w-4 text-indigo-500" />
              <span>Account Credentials</span>
            </div>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline cursor-pointer"
            >
              <Edit2 className="h-3 w-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div>
              <span className="block text-slate-400 dark:text-slate-500 font-medium mb-0.5">
                Username
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center gap-1.5">
                <AtSign className="h-3.5 w-3.5 text-slate-400" />
                {accountCredentials.username || "—"}
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <span className="block text-slate-400 dark:text-slate-500 font-medium">
                  Password
                </span>
                <button
                  type="button"
                  onClick={() => setShowPasswordPreview(!showPasswordPreview)}
                  className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {showPasswordPreview ? (
                    <>
                      <EyeOff className="h-3 w-3" /> Hide
                    </>
                  ) : (
                    <>
                      <Eye className="h-3 w-3" /> Show
                    </>
                  )}
                </button>
              </div>
              <span className="text-slate-800 dark:text-slate-200 font-semibold font-mono text-sm">
                {showPasswordPreview
                  ? accountCredentials.password
                  : "••••••••••••"}
              </span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions Check */}
        <div className="rounded-xl border border-slate-200/80 p-4 bg-white dark:bg-slate-900/60 dark:border-slate-800">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
                if (e.target.checked) setTermsError(false);
              }}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <span className="text-xs text-slate-600 dark:text-slate-400 select-none leading-relaxed">
              I acknowledge that the information provided is true and complete, and I agree to the{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                Privacy Policy
              </span>
              .
            </span>
          </label>
          {termsError && (
            <p className="mt-2 text-xs text-rose-600 dark:text-rose-400 pl-7 font-medium">
              Please agree to the terms before submitting your registration.
            </p>
          )}
        </div>
      </div>

      {/* Navigation & Final Submit */}
      <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-100 dark:border-slate-800 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => prevStep()}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          Back
        </Button>

        <Button
          type="button"
          isLoading={isSubmitting}
          onClick={handleFinalSubmit}
          leftIcon={<CheckCircle2 className="h-4 w-4" />}
          className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/25"
        >
          Submit Registration
        </Button>
      </div>
    </div>
  );
};
