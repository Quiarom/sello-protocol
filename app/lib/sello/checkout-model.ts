import {
  LICENSE_CONFIG,
  LICENSE_LABELS,
  SELLO_NARRATIVE,
  SELLO_PAYMENT_STATE_LABELS,
  USES,
  selloAgentPolicy,
  selloCheckoutConfig,
  selloDemoArticle,
  selloReceiptDemo,
  selloRevenueEvents,
  type SelloCheckoutConfig,
  type SelloLicenseKey,
  type SelloPaymentStateKey,
  type SelloRevenueEvent,
  type SelloUseKey,
} from "./constants";

export type {
  SelloCheckoutConfig,
  SelloLicenseKey,
  SelloPaymentStateKey,
  SelloRevenueEvent,
  SelloUseKey,
} from "./constants";

export {
  LICENSE_CONFIG,
  LICENSE_LABELS,
  SELLO_NARRATIVE,
  SELLO_PAYMENT_STATE_LABELS,
  USES,
  selloAgentPolicy,
  selloCheckoutConfig,
  selloDemoArticle,
  selloReceiptDemo,
  selloRevenueEvents,
};

export function getAllowedUseMask(uses: ReadonlyArray<SelloUseKey>): number {
  return uses.reduce((mask, useKey) => mask | USES[useKey], 0);
}

export function hasAllowedUse(mask: number, useKey: SelloUseKey): boolean {
  return (mask & USES[useKey]) === USES[useKey];
}

export function getLicenseConfig(
  license: SelloLicenseKey
): SelloCheckoutConfig {
  if (license === selloCheckoutConfig.license.key) {
    return selloCheckoutConfig;
  }

  const config = LICENSE_CONFIG[license];
  const freeUses = [
    "summarize",
    "quote",
  ] as const satisfies ReadonlyArray<SelloUseKey>;
  const paidUses =
    license === "sello-pay"
      ? ([
          "summarize",
          "quote",
          "voice",
        ] as const satisfies ReadonlyArray<SelloUseKey>)
      : ([] as const satisfies ReadonlyArray<SelloUseKey>);

  return {
    license: {
      key: license,
      label: LICENSE_LABELS[license],
      description: config.description,
      badge: config.badge,
      licenseType: config.licenseType,
    },
    freeUses,
    paidUses,
    narrationPrice: selloCheckoutConfig.narrationPrice,
    trainingPolicy: {
      status:
        license === "sello-free"
          ? "allowed"
          : license === "sello-no-train"
            ? "prohibited"
            : "restricted",
      label: config.trainingStatus,
    },
    attribution: selloAgentPolicy.attribution,
    policyLinks: selloCheckoutConfig.policyLinks,
    paymentStates: SELLO_PAYMENT_STATE_LABELS,
    meta: {
      ...selloCheckoutConfig.meta,
      license,
    },
    receiptFields: selloCheckoutConfig.receiptFields,
  };
}

export function createAttribution(author: string, publisher: string): string {
  return selloAgentPolicy.attribution.format
    .replace("{author}", author)
    .replace("{publisher}", publisher);
}

export function getPaymentStateLabel(state: SelloPaymentStateKey): string {
  return SELLO_PAYMENT_STATE_LABELS[state];
}

export function summarizeRevenue(events: ReadonlyArray<SelloRevenueEvent>) {
  return events.reduce(
    (summary, event) => {
      const amount = Number(event.amountUSDC);
      if (Number.isFinite(amount)) {
        summary.totalUSDC += amount;
      }
      if (event.eventType === "receipt_recorded") {
        summary.receiptsRecorded += 1;
      }
      if (event.eventType === "payment_settled") {
        summary.paymentsSettled += 1;
      }
      return summary;
    },
    {
      totalUSDC: 0,
      receiptsRecorded: 0,
      paymentsSettled: 0,
    }
  );
}
