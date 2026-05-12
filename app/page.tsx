/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { LandingSection } from "@/app/components/landing/LandingSection";
import { LandingCheckoutPreview } from "@/app/components/landing/LandingCheckoutPreview";

import { LandingFlowItem } from "@/app/components/landing/LandingFlowItem";
import { LandingProofPreview } from "@/app/components/landing/LandingProofPreview";
import { LandingAvalPreview } from "@/app/components/landing/LandingAvalPreview";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      {/* ── S1: HERO ── */}
      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content (order-1 on mobile) */}
          <div className="lg:col-span-7 order-1 space-y-10">
            <div className="space-y-6">
              <span className="stamp-badge text-primary animate-in fade-in slide-in-from-left-4 duration-700">
                Agent Rights Checkout
              </span>
              <h1 className="font-headline text-5xl sm:text-6xl lg:text-8xl font-black uppercase leading-[0.85] tracking-tight text-cream animate-in fade-in slide-in-from-bottom-8 duration-1000">
                Rights Checkout
                <br />
                <span className="text-primary italic">for AI Agents</span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg lg:text-xl leading-relaxed text-muted animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100">
                Sello helps newsrooms publish AI-readable usage rules, accept
                x402-style payments, and record Proof of Consent on Solana.
              </p>
              <div className="flex items-center gap-4 animate-in fade-in duration-1000 delay-200">
                <div className="h-px w-8 bg-primary/40" />
                <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-primary font-bold">
                  Creators publish rules. Agents pay. Solana records.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              <Link
                href="/register"
                className="stamp-button text-xl px-10 py-5 group"
              >
                Create AI Checkout
                <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
              <Link
                href="/blog/protected-article"
                className="stamp-button stamp-button-secondary text-xl px-10 py-5"
              >
                Watch Agent Checkout
              </Link>
            </div>
          </div>

          {/* Right: Visual Preview (order-2 on mobile) */}
          <div className="lg:col-span-5 order-2 animate-in fade-in zoom-in-95 duration-1000 delay-150">
            <LandingCheckoutPreview />
          </div>
        </div>
      </section>

      {/* ── S2: PROBLEM ── */}
      <LandingSection
        title="AI agents are content consumers. The web has no rights checkout."
        subtitle="AI agents can read articles, summarize news, generate narrations, and reuse content. Publishers lose attribution, traffic, and revenue. Current web signals are fragmented, not payable, and not verifiable."
        dark
      >
        <div className="grid gap-1 lg:grid-cols-3 bg-border-low border border-border-low overflow-hidden">
          {[
            {
              title: "Fragmented Signals",
              desc: "Current standards like robots.txt are not machine-payable or verifiable, leaving publishers with no way to enforce terms.",
              color: "text-primary",
            },
            {
              title: "Missing Attribution",
              desc: "Agents summarize and narrate content without clear links to the source, destroying traffic and publisher brand value.",
              color: "text-gold",
            },
            {
              title: "Lost Revenue",
              desc: "There is no way for a responsible AI agent to 'checkout' and pay for premium content usage automatically.",
              color: "text-cream",
            },
          ].map((card) => (
            <div key={card.title} className="bg-background/40 p-10 space-y-4">
              <p
                className={`font-display text-2xl uppercase tracking-widest ${card.color}`}
              >
                {card.title}
              </p>
              <p className="text-base text-muted leading-relaxed italic">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </LandingSection>

      {/* ── S3: PRODUCT FLOW ── */}
      <LandingSection
        title="One flow for responsible AI usage."
        subtitle="Sello connects permission, payment, and receipt for the agent economy."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0">
          <LandingFlowItem
            step="01"
            title="Detect"
            desc="Agent reads Sello tag, llms.txt, and tdm-policy."
            icon="👁"
          />
          <LandingFlowItem
            step="02"
            title="Pay"
            desc="Paid actions trigger x402-style devnet payment."
            icon="⚡"
          />
          <LandingFlowItem
            step="03"
            title="Use"
            desc="Premium narration or usage is unlocked."
            icon="🔓"
          />
          <LandingFlowItem
            step="04"
            title="Record"
            desc="UsageReceipt records Proof of Consent on Solana."
            icon="◈"
          />
          <LandingFlowItem
            step="05"
            title="Track"
            desc="Aval shows paid usage, requests, and revenue."
            icon="📈"
            isLast
          />
        </div>
      </LandingSection>

      {/* ── S4 & S5: CHECKOUT & PROOF ── */}
      <LandingSection
        title="Sello Checkout turns rights into an agent transaction."
        subtitle="A Sello-protected article tells agents what is free, what requires attribution, and what requires payment."
        dark
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="postal-card p-8 border-primary/20 bg-primary/[0.02]">
              <h4 className="font-display text-xl uppercase tracking-widest text-primary mb-6">
                Technical Transaction View
              </h4>
              <ul className="space-y-4">
                {[
                  { label: "Requested action", val: "Voice narration" },
                  { label: "License", val: "sello-voice" },
                  { label: "Price", val: "0.10 USDC" },
                  { label: "Settlement", val: "x402-style" },
                  { label: "Audit", val: "Solana devnet" },
                ].map((row) => (
                  <li
                    key={row.label}
                    className="flex justify-between border-b border-border-low pb-2"
                  >
                    <span className="font-mono text-xs uppercase text-muted">
                      {row.label}
                    </span>
                    <span className="font-mono text-xs text-cream font-bold">
                      {row.val}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/blog/protected-article"
                className="stamp-button w-full mt-8 py-4"
              >
                Open Checkout Demo
              </Link>
            </div>
            <p className="text-muted italic leading-relaxed">
              Proof of Consent, not proof of ownership. Sello records that a
              wallet published machine-readable usage terms for a content hash.
            </p>
          </div>
          <LandingProofPreview />
        </div>
      </LandingSection>

      {/* ── S6: AVAL NEWSROOMS ── */}
      <LandingSection
        title="Aval Newsrooms turns agent usage into revenue."
        subtitle="The first product built on Sello. Publishers create checkouts, track requests, and generate rights evidence."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <LandingAvalPreview />
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Protected Inventory", val: "2.7k" },
                { label: "Rights Revenue", val: "USDC" },
                { label: "Agent Requests", val: "12k" },
                { label: "Consent Audit", val: "Live" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="p-5 border border-border-low bg-card/20"
                >
                  <p className="font-mono text-[10px] uppercase text-muted tracking-widest">
                    {m.label}
                  </p>
                  <p className="font-headline text-2xl font-black text-cream mt-1">
                    {m.val}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/dashboard"
              className="stamp-button inline-flex px-10 py-4 group"
            >
              View Revenue Console
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </LandingSection>

      {/* ── S7, S8, S9: FINAL CALLS ── */}
      <section className="border-t border-border-low bg-card/20 py-20 md:py-32 text-center space-y-12">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tight text-cream">
            Give AI agents a way to pay for{" "}
            <span className="text-primary italic">what they use.</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto italic">
            "Every great work deserves a seat at the AI table — with terms
            defined by the creator, not the scraper."
          </p>
        </div>

        <div className="flex flex-col justify-center gap-6 sm:flex-row px-6">
          <Link
            href="/register"
            className="stamp-button px-12 py-5 text-xl group"
          >
            Start with one article
            <svg
              className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
          <Link
            href="/blog/protected-article"
            className="stamp-button stamp-button-secondary px-12 py-5 text-xl"
          >
            Run Agent Demo
          </Link>
        </div>

        <div className="pt-12 border-t border-border-low/50 max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Permission", desc: "Sello Tags" },
            { label: "Payment", desc: "USDC Micros" },
            { label: "Receipt", desc: "UsageReceipt" },
            { label: "Consensus", desc: "Solana Devnet" },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="font-mono text-[10px] uppercase text-primary font-bold tracking-widest">
                {item.label}
              </p>
              <p className="font-headline text-sm font-black text-cream uppercase">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
