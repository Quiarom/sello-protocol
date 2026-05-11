import {
  createAttribution,
  selloCheckoutConfig,
  selloDemoArticle,
  selloReceiptDemo,
} from "@/app/lib/sello/checkout-model";

export type ProofOfConsentReceiptProps = {
  articleTitle?: string;
  usageType?: string;
  license?: string;
  paymentAmountUSDC?: string;
  attributionRequired?: boolean;
  attributionFormat?: string;
  publisherWallet?: string;
  contentHash?: string;
  contentSelloPda?: string;
  usageReceiptPda?: string;
  timestamp?: string | number;
  cluster?: string;
  transactionSignature?: string;
  className?: string;
};

function ReceiptField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-b border-border-low py-3 last:border-0">
      <dt className="font-mono text-[8px] uppercase tracking-widest text-muted">
        {label}
      </dt>
      <dd className="mt-1 break-all font-mono text-[10px] leading-relaxed text-cream/70">
        {value}
      </dd>
    </div>
  );
}

export function ProofOfConsentReceipt({
  articleTitle = selloReceiptDemo.articleTitle,
  usageType = selloReceiptDemo.action,
  license = selloCheckoutConfig.license.key,
  paymentAmountUSDC = "0.10",
  publisherWallet = selloDemoArticle.publisher.walletAddress,
  contentHash = selloDemoArticle.hash,
  contentSelloPda = selloReceiptDemo.contentPda,
  usageReceiptPda = selloReceiptDemo.usageReceiptPda,
  timestamp = selloReceiptDemo.settledAt,
  transactionSignature = selloReceiptDemo.transactionSignature,
  className = "",
}: ProofOfConsentReceiptProps) {
  const formattedTimestamp = new Date(timestamp).toISOString();

  return (
    <div
      className={`postal-card w-full overflow-hidden border-gold/20 bg-background/40 p-6 sm:p-10 shadow-xl ${className}`}
      aria-label="Proof of Consent receipt"
    >
      <div className="flex flex-col gap-6 border-b border-border-low pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <span className="stamp-badge text-[10px] text-gold font-bold italic">
            Proof of Consent
          </span>
          <h3 className="break-words font-headline text-2xl font-black uppercase leading-tight text-cream sm:text-3xl">
            {articleTitle}
          </h3>
          <p className="text-[11px] leading-relaxed text-muted italic">
            Solana devnet/demo receipt. Records the machine-readable terms for
            the content hash.
          </p>
        </div>
        <div className="postmark flex h-20 w-20 shrink-0 -rotate-12 items-center justify-center text-center text-[8px] font-black border-primary/20 text-primary/40">
          VERIFIED
          <br />
          DEVNET
        </div>
      </div>

      <dl className="grid min-w-0 grid-cols-1 gap-x-8 pt-4 md:grid-cols-2">
        <ReceiptField label="Usage type" value={usageType} />
        <ReceiptField label="License" value={license} />
        <ReceiptField
          label="Settled amount"
          value={`${paymentAmountUSDC} USDC (Sandbox)`}
        />
        <ReceiptField label="Publisher wallet" value={publisherWallet} />
        <ReceiptField label="Content hash" value={contentHash} />
        <ReceiptField label="ContentSello PDA" value={contentSelloPda} />
        <ReceiptField label="UsageReceipt PDA" value={usageReceiptPda} />
        <ReceiptField label="Timestamp" value={formattedTimestamp} />
        <div className="md:col-span-2">
          <ReceiptField
            label="Transaction signature"
            value={transactionSignature}
          />
        </div>
      </dl>
    </div>
  );
}
