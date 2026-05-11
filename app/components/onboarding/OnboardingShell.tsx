import type { ReactNode } from "react";

type OnboardingShellProps = {
  title: string;
  description: string;
  step: number;
  totalSteps: number;
  children: ReactNode;
};

export function OnboardingShell({
  title,
  description,
  step,
  totalSteps,
  children,
}: OnboardingShellProps) {
  const progress = Math.min(100, Math.round((step / totalSteps) * 100));

  return (
    <div className="mx-auto w-full max-w-7xl border-x border-border-low bg-background/20 px-4 py-8 sm:px-6 md:px-8 lg:px-12 lg:py-16">
      <div className="postal-card p-6 sm:p-8 md:p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]">
        <div className="airmail-stripe mb-5 md:h-2" />
        <div className="mb-6 md:mb-8">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-primary">
            Step {step} of {totalSteps}
          </p>
          <div className="mt-3 h-1.5 sm:h-2 w-full border border-border-low bg-background">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <h1 className="font-headline mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-5xl font-black uppercase leading-tight text-cream">
            {title}
          </h1>
          <p className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base text-muted">
            {description}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
