"use client";

import { useMemo, useState } from "react";
import {
  selloDemoArticle,
  selloReceiptDemo,
} from "@/app/lib/sello/checkout-model";
import { buildSelloMeta } from "@/app/lib/sello/meta";
import { SelloCheckout } from "./SelloCheckout";
import { ProofOfConsentReceipt } from "./ProofOfConsentReceipt";
import { ellipsify } from "@/app/lib/explorer";

type DemoStage = "discovery" | "rights" | "signing" | "delivery" | "audit";

export function ProtectedArticleCommerceDemo() {
  const [stage, setStage] = useState<DemoStage>("discovery");
  const [viewMode, setViewMode] = useState<"human" | "agent">("human");
  const [isProcessing, setIsProcessing] = useState(false);

  const nextStage = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1000));

    if (stage === "discovery") setStage("rights");
    else if (stage === "rights") setStage("signing");
    else if (stage === "signing") setStage("delivery");
    else if (stage === "delivery") setStage("audit");
    else if (stage === "audit") {
      setStage("discovery");
      setViewMode("human");
    }

    setIsProcessing(false);
  };

  const checkoutStep = useMemo(() => {
    const mapping: Record<DemoStage, any> = {
      discovery: "detect",
      rights: "verify",
      signing: "pay",
      delivery: "use",
      audit: "receipt",
    };
    return mapping[stage];
  }, [stage]);

  const buttonLabel = {
    discovery: "Analyze Rights Checkout →",
    rights: "Negotiate Terms →",
    signing: "Settle x402 Payment →",
    delivery: "View Proof of Consent →",
    audit: "Restart Simulation",
  }[stage];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Article (order-2 on mobile) */}
        <section className="lg:col-span-7 order-2 lg:order-1 space-y-6">
          {/* Tabs */}
          <div className="flex border-b border-border-low">
            <button
              onClick={() => setViewMode("human")}
              className={`px-6 py-3 font-display text-xs tracking-widest uppercase transition-all ${viewMode === "human" ? "bg-card text-primary border-b-2 border-primary shadow-inner" : "text-muted hover:text-cream"}`}
            >
              Human View
            </button>
            <button
              onClick={() => setViewMode("agent")}
              className={`px-6 py-3 font-display text-xs tracking-widest uppercase transition-all ${viewMode === "agent" ? "bg-card text-gold border-b-2 border-gold shadow-inner" : "text-muted hover:text-cream"}`}
            >
              Agent View
            </button>
          </div>

          <div className="postal-card p-8 sm:p-12 min-h-[400px]">
            {viewMode === "human" ? (
              <article className="prose prose-invert max-w-none space-y-6">
                <div className="space-y-2 mb-8">
                  <h2 className="font-headline text-3xl sm:text-4xl font-black uppercase text-cream leading-tight m-0">
                    {selloDemoArticle.title}
                  </h2>
                  <p className="font-mono text-xs uppercase text-muted tracking-widest">
                    Published by {selloDemoArticle.publisher.name} •{" "}
                    {new Date(selloReceiptDemo.settledAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-muted text-lg leading-relaxed italic space-y-4">
                  <p>
                    As the world shifts toward machine-readable architectures,
                    high-end newsrooms are no longer just producing text. They
                    are producing cryptographically verifiable assets.
                  </p>
                  <p>
                    Sello Protocol ensures that when an AI agent arrives at this
                    page, it doesn't just "scrape". It detects the rights
                    checkout, understands the price of automated narration, and
                    executes an x402 settlement on Solana before processing.
                  </p>
                </div>

                {stage === "delivery" || stage === "audit" ? (
                  <div className="mt-12 p-8 border border-green-ink/30 bg-green-ink/[0.03] animate-in fade-in zoom-in-95 duration-700">
                    <div className="flex items-center gap-4 text-green-ink mb-4">
                      <div className="h-10 w-10 rounded-full border-2 border-green-ink flex items-center justify-center">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="font-headline text-xl font-bold uppercase tracking-tight">
                        Asset Unlocked for Agent
                      </p>
                    </div>
                    <div className="p-4 bg-background border border-border-low flex items-center justify-between">
                      <span className="font-mono text-sm text-muted">
                        demo-narration-final.mp3
                      </span>
                      <span className="stamp-badge border-green-ink/40 text-xs text-green-ink">
                        READY
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-12 p-12 border-2 border-dashed border-border-low flex flex-col items-center justify-center text-center space-y-4">
                    <div className="h-12 w-12 rounded-full border border-border-low flex items-center justify-center text-muted">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-mono uppercase tracking-widest text-muted">
                      Premium Asset Locked
                    </p>
                  </div>
                )}
              </article>
            ) : (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-4">
                  <span className="stamp-badge text-gold italic font-bold">
                    Protocol Signal Detection
                  </span>
                  <div className="p-6 bg-background border border-border-low font-mono text-xs text-gold break-all shadow-inner relative group">
                    <div className="absolute right-3 top-3 text-xs uppercase tracking-tighter opacity-30">
                      HTML Head
                    </div>
                    {`<meta name="sello" content="${buildSelloMeta()}" />`}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-5 border border-border-low bg-background/40 space-y-2">
                    <p className="font-mono text-xs uppercase text-muted">
                      Active License
                    </p>
                    <p className="font-headline text-xl text-primary font-bold">
                      {stage === "discovery" ? "Detecting..." : "SELLO-VOICE"}
                    </p>
                  </div>
                  <div className="p-5 border border-border-low bg-background/40 space-y-2">
                    <p className="font-mono text-xs uppercase text-muted">
                      Micropayment
                    </p>
                    <p className="font-headline text-xl text-gold font-bold">
                      {stage === "discovery" ? "---" : "0.10 USDC"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="font-mono text-xs uppercase text-muted tracking-widest font-bold">
                    Agent Log
                  </p>
                  <div className="border border-border-low bg-background/60 p-4 font-mono text-xs text-muted space-y-1">
                    <p className="text-green-ink/60">
                      [bot] GET /blog/protected-article
                    </p>
                    <p className="text-cream">
                      [bot] SEARCH meta[name="sello"]
                    </p>
                    {stage !== "discovery" && (
                      <p className="text-gold">
                        [bot] DETECTED: sello-voice | price: 0.10
                      </p>
                    )}
                    {stage === "signing" && (
                      <p className="text-primary animate-pulse">
                        [bot] INITIATING x402-STYLE SETTLEMENT...
                      </p>
                    )}
                    {(stage === "delivery" || stage === "audit") && (
                      <>
                        <p className="text-green-ink">
                          [bot] SETTLEMENT CONFIRMED:{" "}
                          {ellipsify(selloReceiptDemo.usageReceiptPda, 8)}
                        </p>
                        <p className="text-cream">
                          [bot] PROOF OF CONSENT RECORDED ON SOLANA
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Checkout (order-1 on mobile) */}
        <aside className="lg:col-span-5 order-1 lg:order-2 space-y-6">
          <div className="sticky top-24 space-y-6">
            <SelloCheckout
              requestedAction="Voice narration"
              paymentState={stage === "signing" ? "paying" : "idle"}
              currentStep={checkoutStep}
              showReceipt={false}
              className="shadow-2xl"
            />

            <div className="postal-card p-6 bg-card border-border-low space-y-6">
              <div className="space-y-1">
                <p className="font-mono text-xs uppercase text-muted tracking-widest">
                  Checkout Control
                </p>
                <p className="text-xs text-muted italic">
                  Step through the autonomous rights checkout flow.
                </p>
              </div>
              <button
                onClick={nextStage}
                disabled={isProcessing}
                className="stamp-button w-full py-4 text-xl font-black shadow-lg"
              >
                {isProcessing ? "Processing..." : buttonLabel}
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom: Receipt (order-3) */}
      {stage === "audit" && (
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 pt-12 border-t border-border-low order-3">
          <div className="text-center space-y-2 mb-10">
            <span className="stamp-badge text-green-ink font-bold italic">
              DEVNET DEMO RECEIPT - PROOF OF CONSENT
            </span>
            <h2 className="font-headline text-3xl font-black uppercase text-cream">
              On-Chain Rights Audit
            </h2>
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
        </div>
      )}
    </div>
  );
}
