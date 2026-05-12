import type { Metadata } from "next";
import { ProtectedArticleCommerceDemo } from "@/app/components/sello/ProtectedArticleCommerceDemo";
import { buildSelloMeta } from "@/app/lib/sello/meta";

export const metadata: Metadata = {
  title: "Content Shield | Sello Protocol",
  description: "Experience the machine-readable rights protocol in action.",
  other: {
    sello: buildSelloMeta(),
  },
};

export default function DemoArticle() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 border-x border-border-low bg-background/20 min-h-screen">
      {/* Narrative Header */}
      <header className="border-b border-border-low pb-8 mb-12 space-y-2">
        <span className="stamp-badge text-primary uppercase text-xs tracking-widest">
          Rights Checkout Demo
        </span>
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-cream">
          Agent Rights <span className="text-primary italic">Checkout</span>
        </h1>
        <p className="text-muted text-base md:text-lg max-w-2xl">
          Watch an AI agent detect rules, negotiate terms, and execute an
          x402-style settlement in real-time.
        </p>
      </header>

      {/* Main Grid Experience */}
      <ProtectedArticleCommerceDemo />

      {/* Footer Nav */}
      <div className="text-center pt-12 border-t border-border-low mt-16">
        <a
          href="/onboarding/agent"
          className="text-xs font-mono text-muted uppercase hover:text-primary transition-colors underline underline-offset-8"
        >
          ← Back to Agent Onboarding
        </a>
      </div>
    </main>
  );
}
