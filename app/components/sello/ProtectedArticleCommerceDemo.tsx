"use client";

import { useMemo, useState } from "react";
import {
  selloCheckoutConfig,
  selloDemoArticle,
  selloReceiptDemo,
} from "@/app/lib/sello/checkout-model";
import { buildSelloMeta } from "@/app/lib/sello/meta";
import { SelloCheckout } from "./SelloCheckout";
import { ProofOfConsentReceipt } from "./ProofOfConsentReceipt";

type DemoStage = 
  | "discovery" 
  | "rights" 
  | "signing" 
  | "delivery" 
  | "audit";

export function ProtectedArticleCommerceDemo() {
  const [stage, setStage] = useState<DemoStage>("discovery");
  const [isProcessing, setIsProcessing] = useState(false);

  const nextStage = async () => {
    setIsProcessing(true);
    // Simulate protocol delays
    await new Promise(r => setTimeout(r, 1200));
    
    if (stage === "discovery") setStage("rights");
    else if (stage === "rights") setStage("signing");
    else if (stage === "signing") setStage("delivery");
    else if (stage === "delivery") setStage("audit");
    else if (stage === "audit") setStage("discovery");
    
    setIsProcessing(false);
  };

  return (
    <div className="space-y-12">
      {/* Narrative Progress */}
      <div className="flex justify-between max-w-2xl mx-auto px-4">
        {(["discovery", "rights", "signing", "delivery", "audit"] as const).map((s, i) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <div className={`h-2 w-12 sm:w-20 rounded-full transition-colors ${
              stage === s ? "bg-primary shadow-[0_0_10px_rgba(204,21,18,0.5)]" : 
              i < ["discovery", "rights", "signing", "delivery", "audit"].indexOf(stage) ? "bg-green-ink" : "bg-border-low"
            }`} />
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto space-y-12">
        {stage === "discovery" && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-8">
            <article className="postal-card p-8 sm:p-12 space-y-6 shadow-2xl">
              <span className="stamp-badge text-primary italic font-bold">1. Content Discovery</span>
              <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase text-cream leading-tight">
                An agent arrives <br/> at your content.
              </h2>
              <p className="text-muted text-lg leading-relaxed italic">
                The AI agent doesn't see "design". It parses the HTML metadata to find instructions.
              </p>
              <div className="p-6 bg-background border border-border-low font-mono text-[10px] sm:text-xs text-gold break-all shadow-inner">
                {`<meta name="sello" content="${buildSelloMeta()}" />`}
              </div>
              <button onClick={nextStage} disabled={isProcessing} className="stamp-button w-full py-5 text-xl">
                {isProcessing ? "Analyzing..." : "Parse Rights Signal →"}
              </button>
            </article>
          </div>
        )}

        {stage === "rights" && (
          <div className="animate-in fade-in slide-in-from-right-6 duration-700 space-y-8">
            <div className="postal-card p-8 sm:p-12 space-y-8 border-gold/20 shadow-2xl">
               <span className="stamp-badge text-gold italic font-bold">2. Rights Negotiation</span>
               <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase text-cream leading-tight">
                 Terms identified <br/> before processing.
               </h2>
               <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-5 border border-border-low bg-background/40">
                    <p className="font-mono text-[10px] uppercase text-muted mb-2">License</p>
                    <p className="font-headline text-xl text-primary font-bold">SELLO-VOICE</p>
                  </div>
                  <div className="p-5 border border-border-low bg-background/40">
                    <p className="font-mono text-[10px] uppercase text-muted mb-2">Micropayment</p>
                    <p className="font-headline text-xl text-gold font-bold">0.10 USDC</p>
                  </div>
               </div>
               <p className="text-muted text-lg italic leading-relaxed">
                 The agent confirms that "Voice Narration" is a paid action under the current license.
               </p>
               <button onClick={nextStage} disabled={isProcessing} className="stamp-button w-full py-5 text-xl">
                 {isProcessing ? "Negotiating..." : "Proceed to Checkout →"}
               </button>
            </div>
          </div>
        )}

        {stage === "signing" && (
          <div className="animate-in fade-in zoom-in-95 duration-700 space-y-8">
            <SelloCheckout
              requestedAction="Voice narration"
              paymentState="paying"
              currentStep="pay"
              showReceipt={false}
              className="shadow-2xl scale-105"
            />
            <div className="postal-card p-8 bg-primary/5 border-primary/20 text-center space-y-6">
               <h3 className="font-headline text-2xl font-bold text-cream uppercase">Authorization Required</h3>
               <p className="text-muted italic">Simulating a Solana Devnet transaction. The agent is preparing a x402-style settlement.</p>
               <button onClick={nextStage} disabled={isProcessing} className="stamp-button w-full py-6 text-2xl font-black shadow-[0_0_20px_rgba(204,21,18,0.3)]">
                 {isProcessing ? "Signing..." : "Sign & Pay 0.10 USDC"}
               </button>
            </div>
          </div>
        )}

        {stage === "delivery" && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-8">
            <div className="postal-card p-8 sm:p-12 text-center space-y-8 border-green-ink/20 shadow-2xl">
               <div className="mx-auto h-20 w-20 rounded-full border-2 border-green-ink flex items-center justify-center text-green-ink animate-bounce">
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
               </div>
               <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase text-cream leading-tight">
                 Payment Verified. <br/> <span className="text-green-ink">Asset Unlocked.</span>
               </h2>
               <div className="p-6 border border-green-ink/30 bg-green-ink/5 font-mono text-sm text-green-ink flex items-center justify-between">
                  <span>demo-narration-final.mp3</span>
                  <span className="stamp-badge border-green-ink/40 text-[9px]">READY</span>
               </div>
               <button onClick={nextStage} disabled={isProcessing} className="stamp-button w-full py-5 text-xl">
                 {isProcessing ? "Finalizing..." : "Generate Proof of Consent →"}
               </button>
            </div>
          </div>
        )}

        {stage === "audit" && (
          <div className="animate-in fade-in duration-1000 space-y-8">
            <div className="text-center space-y-2">
               <span className="stamp-badge text-green-ink font-bold italic">Solana devnet/demo receipt</span>
               <h2 className="font-headline text-3xl font-black uppercase text-cream">On-Chain Audit Trail</h2>
            </div>
            <ProofOfConsentReceipt
              articleTitle={selloDemoArticle.title}
              usageType="Voice narration"
              license="sello-voice"
              paymentAmountUSDC="0.10"
              publisherWallet={selloDemoArticle.publisher.walletAddress}
              contentHash={selloDemoArticle.hash}
              contentSelloPda={selloDemoArticle.contentPda}
              usageReceiptPda={selloReceiptDemo.usageReceiptPda}
              timestamp={selloReceiptDemo.settledAt}
              cluster="devnet"
            />
            <button onClick={nextStage} className="stamp-button stamp-button-secondary w-full py-4 uppercase tracking-widest text-xs">
              Restart Simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
