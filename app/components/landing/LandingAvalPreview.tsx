"use client";

import { CreatorDashboardView } from "@/app/components/dashboard/CreatorDashboardView";

export function LandingAvalPreview() {
  return (
    <div className="relative space-y-8">
      <div className="postal-card p-6 md:p-10 border-primary/20 shadow-2xl bg-card/40">
        <div className="flex items-center justify-between mb-10">
          <div className="space-y-1">
            <span className="stamp-badge text-primary uppercase text-xs tracking-widest">
              Aval Newsrooms
            </span>
            <h3 className="font-headline text-3xl font-black uppercase text-cream">
              Revenue Console
            </h3>
          </div>
          <div className="postmark h-16 w-16 flex items-center justify-center text-[10px] -rotate-6 opacity-30">
            LIVE
            <br />
            AUDIT
          </div>
        </div>

        {/* Simplified metrics summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 border border-green-ink/20 bg-green-ink/[0.02]">
            <p className="font-mono text-xs uppercase text-muted tracking-widest">
              Rights Revenue
            </p>
            <p className="font-headline text-3xl font-bold text-green-ink mt-2">
              $142.10
            </p>
            <p className="text-[10px] text-muted italic mt-1">
              Simulated total
            </p>
          </div>
          <div className="p-6 border border-primary/20 bg-primary/[0.02]">
            <p className="font-mono text-xs uppercase text-muted tracking-widest">
              Protected Items
            </p>
            <p className="font-headline text-3xl font-bold text-cream mt-2">
              2,741
            </p>
            <p className="text-[10px] text-muted italic mt-1">
              Inventory count
            </p>
          </div>
          <div className="p-6 border border-gold/20 bg-gold/[0.02]">
            <p className="font-mono text-xs uppercase text-muted tracking-widest">
              Agent Req.
            </p>
            <p className="font-headline text-3xl font-bold text-gold mt-2">
              12k+
            </p>
            <p className="text-[10px] text-muted italic mt-1">
              Monthly requests
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-background/40 border border-border-low border-dashed text-center">
          <p className="text-xs text-muted font-mono uppercase tracking-widest">
            Revenue from automated agent settlements
          </p>
        </div>
      </div>
    </div>
  );
}
