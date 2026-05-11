export const SELLO_NARRATIVE = {
  product:
    "Sello Protocol is the rights checkout for AI agents using newsroom content.",
  tagline:
    "Creators publish the rules. Agents pay when needed. Solana keeps the receipt.",
} as const;

export const SELLO_PROGRAM_ID = "HhXvRpC6uDfCF6sHNWv3xD2yzyjpiEW17eeK13tFaycC";

export const SELLO_POLICY_LINKS = {
  llms: "/llms.txt",
  tdmPolicy: "/tdm-policy.json",
  rsl: "/rsl.txt",
} as const;

export const SELLO_PAYMENT_STATE_LABELS = {
  idle: "Ready to check rights",
  detecting: "Checking rights",
  free: "Allowed now",
  blocked: "Blocked by policy",
  payable: "Payment required",
  paying: "Processing sandbox payment",
  unlocking: "Unlocking narration",
  unlocked: "Narration unlocked",
  receiptPending: "Recording Solana receipt",
  receiptReady: "Receipt recorded",
  error: "Checkout failed",
} as const;

export const USES = {
  summarize: 1 << 0,
  quote: 1 << 1,
  voice: 1 << 2,
  train: 1 << 3,
} as const;

export type SelloUseKey = keyof typeof USES;
export type SelloLicenseKey =
  | "sello-free"
  | "sello-nc"
  | "sello-voice"
  | "sello-pay"
  | "sello-no-train";
export type SelloPaymentStateKey = keyof typeof SELLO_PAYMENT_STATE_LABELS;

export const LICENSE_LABELS: Record<SelloLicenseKey, string> = {
  "sello-free": "Sello Free — agent use allowed with attribution",
  "sello-nc": "Sello NC — free reading rights, paid commercial actions",
  "sello-voice": "Sello Voice — narration requires checkout",
  "sello-pay": "Sello Pay — paid rights before AI use",
  "sello-no-train": "Sello No Train — usage allowed, training blocked",
};

export type SelloPublisher = {
  name: string;
  legalEntity: string;
  newsroomProduct: string;
  domain: string;
  walletLabel: string;
  walletAddress: string;
};

export type SelloMetaFields = {
  id: string;
  license: SelloLicenseKey;
  author: string;
  publisher: string;
  pay: string;
  onchain: string;
  priceUSDC: string;
  voiceId: string;
};

export type SelloReceiptField = {
  key: string;
  label: string;
  value: string;
};

export type SelloRevenueEvent = {
  id: string;
  articleId: string;
  articleTitle: string;
  eventType:
    | "rights_detected"
    | "payment_settled"
    | "narration_unlocked"
    | "receipt_recorded";
  amountUSDC: string;
  timestamp: string;
  receiptRef: string;
  actor: string;
  note: string;
};

export type SelloCheckoutConfig = {
  license: {
    key: SelloLicenseKey;
    label: string;
    description: string;
    badge: string;
    licenseType: number;
  };
  freeUses: ReadonlyArray<SelloUseKey>;
  paidUses: ReadonlyArray<SelloUseKey>;
  narrationPrice: {
    amountUSDC: string;
    amountMicrousdc: bigint;
    display: string;
  };
  trainingPolicy: {
    status: "restricted" | "prohibited" | "allowed";
    label: string;
  };
  attribution: {
    format: string;
    example: string;
  };
  policyLinks: typeof SELLO_POLICY_LINKS;
  paymentStates: typeof SELLO_PAYMENT_STATE_LABELS;
  meta: SelloMetaFields;
  receiptFields: ReadonlyArray<SelloReceiptField>;
};

export const selloDemoArticle = {
  id: "asilo-demo-001",
  slug: "protected-article",
  canonicalPath: "/blog/protected-article",
  title: "How AI agents should check rights before using newsroom content",
  subtitle:
    "Rights checkout for AI agents: detect terms, pay for narration when needed, and record the usage receipt on Solana.",
  publishedAt: "2026-05-09",
  author: "Daniel Quiaro",
  publisher: {
    name: "Aval Newsrooms",
    legalEntity: "Aval Newsrooms C.A.",
    newsroomProduct: "Asilo Digital",
    domain: "demo.selloprotocol.com",
    walletLabel: "Aval treasury",
    walletAddress: "AVaLTrsy111111111111111111111111111111111111",
  } satisfies SelloPublisher,
  summary:
    "One article shows full agent commerce path: rights detection, paid narration checkout, Solana receipt, and publisher revenue visibility.",
  hash: "demo-content-hash-8xK2bq4Y7mNv2R1pQ9zL6cH3uT5sA8eD1fG7jK4mN2p",
  contentPda: "CDPPzRN3eeNiSABBiBZVXpUK4uxUAY8wBRemhfGHu2Ug",
  usageReceiptPda: "RcPTdemo1111111111111111111111111111111111111",
  programId: SELLO_PROGRAM_ID,
  sellerEntity: "wallet:AVaLTrsy111111111111111111111111111111111111",
} as const;

export const selloAgentPolicy = {
  productNarrative: SELLO_NARRATIVE,
  licenseType: "sello-voice" as const,
  allowedFreeUses: [
    "summarize",
    "quote",
  ] as const satisfies ReadonlyArray<SelloUseKey>,
  paidUses: ["voice"] as const satisfies ReadonlyArray<SelloUseKey>,
  trainingPolicy: {
    status: "prohibited" as const,
    summary: "Training prohibited without a separate publisher agreement.",
  },
  attribution: {
    format: "According to {author} in {publisher}",
    example: "According to Daniel Quiaro in Aval Newsrooms",
  },
  policyLinks: SELLO_POLICY_LINKS,
  receiptStatement:
    "Sello records that terms were published for a content hash by a wallet or entity and that a usage receipt was later recorded on Solana.",
} as const;

export const selloReceiptDemo = {
  receiptId: "usage-receipt-demo-001",
  contentId: selloDemoArticle.id,
  articleTitle: selloDemoArticle.title,
  action: "voice_narration",
  settledAmountUSDC: "0.10",
  settledAt: "2026-05-09T17:42:11Z",
  cluster: "devnet",
  transactionSignature:
    "4r6L7vY2dN9qR5tM3kP8sH1xC6bJ4wF7uE2nA5zQ8mK1pR3sT6vY9dN2qR5tM8",
  usageReceiptPda: selloDemoArticle.usageReceiptPda,
  contentPda: selloDemoArticle.contentPda,
  payer: "AgentWalletDemo11111111111111111111111111111111",
  payee: selloDemoArticle.publisher.walletAddress,
  termsVersion: "v2026-05-demo",
  termsHash:
    "demo-terms-hash-41f2b87bb2f4f4fe4a8a7b9f9d3d2a0c1b5e7d9a3f2c4e6d8b0a1c3e5f7a9b1",
  proofNote:
    "Demo-safe receipt showing sandbox payment state and Solana usage record, not legal ownership proof.",
} as const;

export const selloRevenueEvents = [
  {
    id: "rev-event-001",
    articleId: selloDemoArticle.id,
    articleTitle: selloDemoArticle.title,
    eventType: "rights_detected",
    amountUSDC: "0.00",
    timestamp: "2026-05-09T17:40:02Z",
    receiptRef: "pending",
    actor: "Agent checkout demo",
    note: "Agent detected Sello tag and policy files before narration request.",
  },
  {
    id: "rev-event-002",
    articleId: selloDemoArticle.id,
    articleTitle: selloDemoArticle.title,
    eventType: "payment_settled",
    amountUSDC: "0.10",
    timestamp: "2026-05-09T17:41:44Z",
    receiptRef: "tx:4r6L7vY2...",
    actor: "Agent checkout demo",
    note: "Sandbox/devnet payment accepted for narration unlock.",
  },
  {
    id: "rev-event-003",
    articleId: selloDemoArticle.id,
    articleTitle: selloDemoArticle.title,
    eventType: "receipt_recorded",
    amountUSDC: "0.10",
    timestamp: "2026-05-09T17:42:11Z",
    receiptRef: selloReceiptDemo.receiptId,
    actor: "Aval Newsrooms Console",
    note: "Usage receipt linked to content hash and publisher wallet entity.",
  },
] as const satisfies ReadonlyArray<SelloRevenueEvent>;

export const selloCheckoutConfig = {
  license: {
    key: selloAgentPolicy.licenseType,
    label: LICENSE_LABELS[selloAgentPolicy.licenseType],
    description:
      "Summaries and short quotes stay free with attribution. Narration requires checkout before use.",
    badge: "text-primary border-primary/30 bg-primary/10",
    licenseType: 2,
  },
  freeUses: selloAgentPolicy.allowedFreeUses,
  paidUses: selloAgentPolicy.paidUses,
  narrationPrice: {
    amountUSDC: "0.10",
    amountMicrousdc: 100_000n,
    display: "$0.10 USDC",
  },
  trainingPolicy: {
    status: selloAgentPolicy.trainingPolicy.status,
    label: selloAgentPolicy.trainingPolicy.summary,
  },
  attribution: selloAgentPolicy.attribution,
  policyLinks: SELLO_POLICY_LINKS,
  paymentStates: SELLO_PAYMENT_STATE_LABELS,
  meta: {
    id: selloDemoArticle.id,
    license: selloAgentPolicy.licenseType,
    author: selloDemoArticle.author,
    publisher: selloDemoArticle.publisher.name,
    pay: "/api/narrate",
    onchain: `solana:devnet:${selloDemoArticle.contentPda}`,
    priceUSDC: "0.10",
    voiceId: "demo-rachel",
  },
  receiptFields: [
    {
      key: "receiptId",
      label: "Receipt ID",
      value: selloReceiptDemo.receiptId,
    },
    {
      key: "contentPda",
      label: "Content PDA",
      value: selloReceiptDemo.contentPda,
    },
    {
      key: "usageReceiptPda",
      label: "UsageReceipt PDA",
      value: selloReceiptDemo.usageReceiptPda,
    },
    {
      key: "transactionSignature",
      label: "Transaction Signature",
      value: selloReceiptDemo.transactionSignature,
    },
    {
      key: "settledAmountUSDC",
      label: "Settled Amount",
      value: `${selloReceiptDemo.settledAmountUSDC} USDC`,
    },
    {
      key: "termsHash",
      label: "Terms Hash",
      value: selloReceiptDemo.termsHash,
    },
  ],
} as const satisfies SelloCheckoutConfig;

export const DEMO_ARTICLE = {
  ...selloDemoArticle,
  publisher: `${selloDemoArticle.publisher.name} / ${selloDemoArticle.publisher.newsroomProduct}`,
  license: selloCheckoutConfig.license.key,
  priceUSDC: selloCheckoutConfig.narrationPrice.amountUSDC,
  usageReceipt: selloReceiptDemo.usageReceiptPda,
  attribution: selloCheckoutConfig.attribution.example,
  summaryPermission: "Allowed with attribution",
  trainingRestriction: selloCheckoutConfig.trainingPolicy.label,
  voiceCondition:
    "Voice narration requires checkout and a recorded usage receipt.",
  devnetRecord:
    "Demo placeholder until connected wallet submits register_content_sello on Solana devnet.",
  hashSource: [
    selloDemoArticle.title,
    selloDemoArticle.subtitle,
    SELLO_NARRATIVE.product,
    SELLO_NARRATIVE.tagline,
  ].join("\n"),
} as const;

export const LICENSE_CONFIG: Record<
  SelloLicenseKey,
  {
    label: string;
    description: string;
    badge: string;
    licenseType: number;
    allowedUses: number;
    voiceStatus: string;
    trainingStatus: string;
    paymentStatus: string;
  }
> = {
  "sello-free": {
    label: LICENSE_LABELS["sello-free"],
    description: "Attribution required. No payment gate in demo checkout.",
    badge: "text-green-ink border-green-ink/30 bg-green-ink/10",
    licenseType: 0,
    allowedUses: USES.summarize | USES.quote | USES.voice | USES.train,
    voiceStatus: "Narration allowed",
    trainingStatus: "Training allowed",
    paymentStatus: "Free",
  },
  "sello-nc": {
    label: LICENSE_LABELS["sello-nc"],
    description: "Commercial AI actions should trigger payment before use.",
    badge: "text-gold border-gold/30 bg-gold/10",
    licenseType: 1,
    allowedUses: USES.summarize | USES.quote | USES.voice,
    voiceStatus: "Narration allowed when terms are respected",
    trainingStatus: "Training restricted",
    paymentStatus: "Conditional payment",
  },
  "sello-voice": {
    label: LICENSE_LABELS["sello-voice"],
    description:
      "Preferred demo path: reading rights stay free, narration requires checkout.",
    badge: selloCheckoutConfig.license.badge,
    licenseType: selloCheckoutConfig.license.licenseType,
    allowedUses: USES.summarize | USES.quote | USES.voice,
    voiceStatus: "Narration requires checkout",
    trainingStatus: "Training prohibited",
    paymentStatus: selloCheckoutConfig.narrationPrice.display,
  },
  "sello-pay": {
    label: LICENSE_LABELS["sello-pay"],
    description: "AI use should be paid before action in sandbox/devnet flow.",
    badge: "text-orange-300 border-orange-300/30 bg-orange-300/10",
    licenseType: 3,
    allowedUses: USES.summarize | USES.quote | USES.voice,
    voiceStatus: "Narration requires checkout",
    trainingStatus: "Training restricted",
    paymentStatus: "Paid before use",
  },
  "sello-no-train": {
    label: LICENSE_LABELS["sello-no-train"],
    description:
      "Summaries and quotes allowed, training blocked by publisher terms.",
    badge: "text-red-300 border-red-300/30 bg-red-300/10",
    licenseType: 4,
    allowedUses: USES.summarize | USES.quote | USES.voice,
    voiceStatus: "Narration allowed",
    trainingStatus: "Training prohibited",
    paymentStatus: "Depends on publisher terms",
  },
};
