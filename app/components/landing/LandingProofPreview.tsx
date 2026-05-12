"use client";

import { selloReceiptDemo } from "@/app/lib/sello/constants";
import { ellipsify } from "@/app/lib/explorer";

export function LandingProofPreview() {
  return (
    <div className="relative group max-w-2xl mx-auto">
      {/* Visual accents */}
      <div className="absolute -inset-6 rotate-1 border border-gold/10 opacity-30" />

      <div className="postal-card p-8 md:p-12 shadow-2xl border-gold/20 relative overflow-hidden">
        {/* Postmark overlay */}
        <div className="absolute top-4 right-4 postmark h-20 w-20 flex items-center justify-center text-[10px] opacity-20 -rotate-12 border-gold text-gold">
          NOTARY
          <br />
          RECORD
        </div>

        <div className="space-y-8 relative z-10">
          <div className="space-y-2">
            <span className="stamp-badge text-gold italic font-bold">
              Proof of Consent
            </span>
            <h3 className="font-headline text-3xl font-black uppercase text-cream">
              Evidence of Rights Signaling
            </h3>
            <p className="text-sm text-muted max-w-lg italic">
              Sello records that a wallet published usage terms for a content
              hash at a specific time.
            </p>
          </div>

          <div className="grid gap-px bg-border-low border border-border-low">
            {[
              {
                label: "Content Hash",
                value: ellipsify(selloReceiptDemo.termsHash, 12),
              },
              { label: "License Type", value: "sello-voice" },
              { label: "Settled Price", value: "0.10 USDC" },
              {
                label: "UsageReceipt",
                value: ellipsify(selloReceiptDemo.usageReceiptPda, 10),
              },
              { label: "Network", value: "Solana Devnet" },
              {
                label: "Timestamp",
                value: new Date(selloReceiptDemo.settledAt).toLocaleString(),
              },
            ].map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 sm:grid-cols-[160px_1fr] bg-background/60 p-4 gap-2"
              >
                <span className="font-mono text-xs uppercase text-muted tracking-widest">
                  {row.label}
                </span>
                <span className="font-mono text-xs text-cream truncate">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted text-center font-mono uppercase tracking-[0.2em] opacity-40">
            --- Cryptographic Proof Segment ---
          </p>
        </div>

        <div className="airmail-stripe h-1 mt-8 opacity-40" />
      </div>
    </div>
  );
}
