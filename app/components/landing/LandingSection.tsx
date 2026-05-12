import type { ReactNode } from "react";

interface LandingSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export function LandingSection({
  id,
  title,
  subtitle,
  children,
  className = "",
  dark = false,
}: LandingSectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${dark ? "bg-card/20" : "bg-transparent"} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mb-12 space-y-4">
            {title && (
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-cream">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="max-w-2xl text-sm sm:text-base md:text-lg text-muted leading-relaxed italic">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
