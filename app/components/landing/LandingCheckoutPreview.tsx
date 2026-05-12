"use client";

import Image from "next/image";
import logo from "../../assets/logo.jpg";

export function LandingCheckoutPreview() {
  return (
    <div className="relative mx-auto w-full max-w-lg animate-in fade-in zoom-in-95 duration-1000 delay-150">
      {/* Background decoration */}
      <div className="absolute -inset-8 rotate-3 border border-border-low opacity-30" />

      {/* The Postal Card Visual */}
      <div className="postal-card relative rotate-[-1.5deg] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] border-primary/25 overflow-hidden">
        <div className="airmail-stripe h-1.5" />

        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt="Sello"
                width={36}
                height={36}
                className="stamp-image h-9 w-9 object-cover"
              />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
                  Asilo Digital
                </p>
                <p className="font-headline text-sm font-bold text-cream uppercase">
                  Agent Rights Checkout
                </p>
              </div>
            </div>
            <span className="stamp-badge text-xs text-green-ink border-green-ink/30 bg-green-ink/10">
              ACTIVE
            </span>
          </div>

          {/* Meta tag display */}
          <div className="overflow-x-auto bg-background border border-border-low p-3 font-mono text-xs leading-relaxed text-muted/80 no-scrollbar">
            <span className="text-muted/50">&lt;</span>
            <span className="text-primary/80">meta </span>
            <span className="text-primary/80">name</span>
            <span className="text-muted/50">="sello" </span>
            <span className="text-primary/80">content</span>
            <span className="text-muted/50">="</span>
            <br />
            <span className="pl-3 text-cream/70">id:8xK2mN|</span>
            <br />
            <span className="pl-3 text-gold/80">license:sello-voice|</span>
            <br />
            <span className="pl-3 text-cream/70">author:Daniel Patete|</span>
            <br />
            <span className="pl-3 text-primary/80">
              pay:https://sello.dev/api/narrate|
            </span>
            <br />
            <span className="pl-3 text-cream/50">price_usdc:0.10</span>
            <span className="text-muted/50">"&gt;</span>
          </div>

          {/* Ledger - Live Status */}
          <div className="grid grid-cols-2 gap-2 font-mono text-xs border-t border-border-low pt-4">
            <div className="space-y-1">
              <p className="text-muted uppercase tracking-wider text-[10px]">
                Protocol
              </p>
              <p className="text-primary font-bold">Sello v1.0</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted uppercase tracking-wider text-[10px]">
                Price / Use
              </p>
              <p className="text-gold font-bold">$0.10 USDC</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted uppercase tracking-wider text-[10px]">
                Payment
              </p>
              <p className="text-cream font-bold">x402-style</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted uppercase tracking-wider text-[10px]">
                Proof
              </p>
              <p className="text-green-ink font-bold">Solana Receipt</p>
            </div>
          </div>
        </div>

        <div className="airmail-stripe h-1.5" />
      </div>

      {/* Floating postmark indicator */}
      <div className="absolute -bottom-6 -right-6 md:-right-10 animate-in fade-in zoom-in duration-1000 delay-500">
        <div className="postmark flex h-20 w-20 rotate-[15deg] items-center justify-center text-center text-[10px] font-black border-primary/30 text-primary/60 bg-background/80 backdrop-blur-sm shadow-xl sm:h-24 sm:w-24 sm:text-xs">
          VERIFIED
          <br />
          CONSENT
        </div>
      </div>
    </div>
  );
}
