import type { ReactNode } from "react";

interface LandingFlowItemProps {
  step: string;
  title: string;
  desc: string;
  icon?: string;
  isLast?: boolean;
}

export function LandingFlowItem({
  step,
  title,
  desc,
  icon,
  isLast = false,
}: LandingFlowItemProps) {
  return (
    <div className="relative flex flex-col items-center text-center space-y-6 p-8 md:p-10 group">
      {/* Connector line for desktop */}
      {!isLast && (
        <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-border-low z-0" />
      )}

      {/* The "Stamp" Visual */}
      <div className="relative h-20 w-20 flex items-center justify-center bg-card border-2 border-dashed border-primary/30 rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <span className="relative z-10 font-display text-4xl text-primary/40 font-black">
          {step}
        </span>
        {icon && (
          <div className="absolute top-1 right-1 text-xs opacity-20">
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-2 relative z-10">
        <h3 className="font-headline text-2xl font-bold text-cream uppercase tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-muted leading-relaxed max-w-[200px]">
          {desc}
        </p>
      </div>

      {/* Decorative airmail corner */}
      <div className="absolute top-0 right-0 h-4 w-4 airmail-stripe opacity-10" />
    </div>
  );
}
