import { MultiStepForm } from "@/components/MultiStepForm";
import { Layers, Database, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 via-slate-100/60 to-slate-200/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <main className="mx-auto max-w-4xl">
        {/* Header Section */}
        <header className="mb-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-3.5 py-1 text-xs font-semibold text-indigo-700 shadow-xs dark:border-indigo-900/50 dark:bg-indigo-950/60 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            <span>React-Hook-Form &bull; Zustand Global State &bull; Next.js</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Multi-Step Registration Form
          </h1>

          <p className="mx-auto max-w-xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A registration workflow with per-step Zod validation,
            seamless navigation, Zustand persistent storage, and interactive confirmation.
          </p>
        </header>

        {/* Main Multi-Step Form */}
        <section aria-label="Registration Form Section">
          <MultiStepForm />
        </section>

        {/* Architecture & Assignment Requirements Grid */}
        <section
          aria-label="Technical Highlights"
          className="mt-14 pt-10 border-t border-slate-200/70 dark:border-slate-800/80"
        >
          <div className="text-center mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Technical Implementation Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-2">
                <Layers className="h-4 w-4" />
                <span>React-Hook-Form + Zod</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Step-by-step schema isolation with custom refinements (matching passwords, phone formats, numeric zip code) and accessible inline error feedback.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex items-center gap-2.5 text-violet-600 dark:text-violet-400 font-semibold text-sm mb-2">
                <Database className="h-4 w-4" />
                <span>Zustand State Persistence</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Centralized Zustand store with LocalStorage persistence. Step transitions, edits, and page reloads preserve all user input without loss.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-semibold text-sm mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Confirmation &amp; UX</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Summary card with direct section jump-to-edit, password strength analyzer, console logging upon submit, and Framer Motion slide animations.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
