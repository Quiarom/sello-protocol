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
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* Narrative Header */}
      <header className="text-center space-y-4">
        <span className="stamp-badge text-primary italic font-bold uppercase tracking-widest">
          Protocol Experience
        </span>
        <h1 className="font-headline text-4xl sm:text-6xl font-black uppercase leading-tight text-cream">
          Shielded{" "}
          <span className="text-primary italic underline decoration-primary/20 underline-offset-8">
            Content
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-muted text-lg sm:text-xl italic">
          Watch how an AI agent detects rights and settles payments in
          real-time.
        </p>
      </header>

      {/* Main Single Column Experience */}
      <ProtectedArticleCommerceDemo />

      {/* Footer Nav */}
      <div className="text-center pt-12 border-t border-border-low">
        <a
          href="/onboarding/agent"
          className="stamp-button stamp-button-secondary text-sm group"
        >
          <span className="mr-2 transition-transform group-hover:-translate-x-1">
            ←
          </span>
          Back to Onboarding
        </a>
      </div>
    </main>
  );
}
