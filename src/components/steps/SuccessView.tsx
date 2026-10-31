import React, { useState } from "react";
import { useFormStore } from "@/store/useFormStore";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Terminal,
  ShieldCheck,
  User,
  Mail,
  MapPin,
} from "lucide-react";

export const SuccessView: React.FC = () => {
  const { submittedPayload, resetForm } = useFormStore();
  const [copied, setCopied] = useState(false);

  const safePayload = submittedPayload
    ? {
        ...submittedPayload,
        accountCredentials: {
          username: submittedPayload.accountCredentials.username,
          password: "•••••••• (masked for security)",
        },
        metadata: {
          submittedAt: new Date().toISOString(),
          status: "SUCCESS_REGISTERED",
        },
      }
    : null;

  const jsonString = JSON.stringify(safePayload, null, 2);

  const handleCopy = () => {
    if (jsonString) {
      navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
      {/* Success Badge */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 ring-8 ring-emerald-500/10 shadow-lg shadow-emerald-500/20">
        <CheckCircle2 className="h-10 w-10 stroke-[2.2]" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Registration Complete!
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Welcome aboard,{" "}
          <span className="font-semibold text-slate-900 dark:text-white">
            {submittedPayload?.personalInfo.fullName || "User"}
          </span>
          ! Your account has been successfully created and saved in global state.
        </p>
      </div>

      {/* Mini summary card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
        <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <User className="h-3.5 w-3.5 text-indigo-500" />
            <span>Account</span>
          </div>
          <div className="mt-1 font-semibold text-slate-800 dark:text-slate-200 text-sm truncate">
            @{submittedPayload?.accountCredentials.username}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Mail className="h-3.5 w-3.5 text-indigo-500" />
            <span>Email</span>
          </div>
          <div className="mt-1 font-semibold text-slate-800 dark:text-slate-200 text-sm truncate">
            {submittedPayload?.personalInfo.email}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin className="h-3.5 w-3.5 text-indigo-500" />
            <span>Location</span>
          </div>
          <div className="mt-1 font-semibold text-slate-800 dark:text-slate-200 text-sm truncate">
            {submittedPayload?.addressDetails.city},{" "}
            {submittedPayload?.addressDetails.country}
          </div>
        </div>
      </div>

      {/* Console output announcement */}
      <div className="flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-mono text-emerald-400 text-left border border-slate-800 shadow-inner">
        <Terminal className="h-4 w-4 shrink-0 text-slate-400" />
        <span className="truncate">
          Data logged to browser console (press F12 &gt; Console to inspect payload)
        </span>
      </div>

      {/* Submitted JSON Inspection Box */}
      <div className="text-left rounded-2xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs text-slate-300 dark:border-slate-800 shadow-md">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Submitted Registration Payload (Zustand)</span>
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded px-2 py-1 hover:bg-slate-800 text-slate-300 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy JSON</span>
              </>
            )}
          </button>
        </div>
        <pre className="overflow-x-auto max-h-48 text-[11px] leading-relaxed text-indigo-300">
          {jsonString}
        </pre>
      </div>

      {/* Reset button */}
      <div className="pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => resetForm()}
          leftIcon={<RotateCcw className="h-4 w-4" />}
          className="w-full sm:w-auto"
        >
          Register Another Account
        </Button>
      </div>
    </div>
  );
};

