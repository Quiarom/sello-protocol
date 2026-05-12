import {
  getPaymentStateLabel,
  type SelloPaymentStateKey,
} from "@/app/lib/sello/checkout-model";

export type AgentTimelineStepKey =
  | "detect"
  | "verify"
  | "pay"
  | "use"
  | "receipt";
export type AgentTimelineStatus = "pending" | "active" | "complete" | "error";

export type AgentRequestTimelineStep = {
  key: AgentTimelineStepKey;
  label: string;
  detail: string;
  state?: SelloPaymentStateKey;
  status?: AgentTimelineStatus;
};

export type AgentRequestTimelineProps = {
  steps?: ReadonlyArray<AgentRequestTimelineStep>;
  currentStep?: AgentTimelineStepKey;
  compact?: boolean;
  onStepClick?: (step: AgentTimelineStepKey) => void;
  className?: string;
};

const DEFAULT_STEPS: ReadonlyArray<AgentRequestTimelineStep> = [
  {
    key: "detect",
    label: "License detected",
    detail: "Agent finds the Sello meta tag.",
    state: "detecting",
  },
  {
    key: "verify",
    label: "Terms verified",
    detail: "License rules are analyzed.",
    state: "payable",
  },
  {
    key: "pay",
    label: "Payment required",
    detail: "Action gated by x402.",
    state: "paying",
  },
  {
    key: "use",
    label: "Narration unlocked",
    detail: "Asset ready for agent use.",
    state: "unlocked",
  },
  {
    key: "receipt",
    label: "Receipt recorded",
    detail: "Proof stored on Solana devnet.",
    state: "receiptReady",
  },
];

const STEP_ORDER: AgentTimelineStepKey[] = [
  "detect",
  "verify",
  "pay",
  "use",
  "receipt",
];

function resolveStatus(
  step: AgentRequestTimelineStep,
  currentStep: AgentTimelineStepKey
): AgentTimelineStatus {
  if (step.status) return step.status;
  const currentIndex = STEP_ORDER.indexOf(currentStep);
  const stepIndex = STEP_ORDER.indexOf(step.key);
  if (stepIndex < currentIndex) return "complete";
  if (stepIndex === currentIndex) return "active";
  return "pending";
}

function statusClasses(status: AgentTimelineStatus) {
  switch (status) {
    case "complete":
      return {
        marker: "bg-green-ink text-background border-green-ink",
        title: "text-green-ink",
      };
    case "active":
      return {
        marker: "bg-primary text-primary-foreground border-primary",
        title: "text-primary",
      };
    default:
      return {
        marker: "bg-background text-muted border-border-low",
        title: "text-muted",
      };
  }
}

export function AgentRequestTimeline({
  steps = DEFAULT_STEPS,
  currentStep = "pay",
  compact = false,
  onStepClick,
  className = "",
}: AgentRequestTimelineProps) {
  return (
    <div
      className={`grid min-w-0 grid-cols-[2.5rem_1fr] border-t border-border-low bg-background/10 ${className}`}
      aria-label="Agent request timeline"
    >
      {steps.map((step) => {
        const status = resolveStatus(step, currentStep);
        const classes = statusClasses(status);
        const stateLabel = step.state
          ? getPaymentStateLabel(step.state)
          : undefined;

        const isClickable = !!onStepClick;

        return (
          <button
            key={step.key}
            onClick={() => onStepClick?.(step.key)}
            disabled={!isClickable}
            className={`contents text-left group ${isClickable ? "cursor-pointer" : "cursor-default"}`}
          >
            {/* Number Column */}
            <div
              className={`flex flex-col items-center border-b border-border-low py-4 transition-colors ${isClickable ? "group-hover:bg-primary/5" : ""}`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center border rounded-full font-mono text-xs font-bold tabular-nums transition-all ${classes.marker}`}
              >
                {STEP_ORDER.indexOf(step.key) + 1}
              </span>
            </div>

            {/* Content Column */}
            <div
              className={`min-w-0 border-b border-border-low py-4 pr-4 transition-colors ${isClickable ? "group-hover:bg-primary/5" : ""}`}
            >
              <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <p
                  className={`break-words font-headline text-sm font-black uppercase tracking-wider transition-colors ${classes.title}`}
                >
                  {step.label}
                </p>
                {stateLabel && !compact && status === "active" ? (
                  <p className="shrink-0 break-words font-mono text-xs uppercase tracking-widest text-primary font-bold sm:text-right">
                    {stateLabel}
                  </p>
                ) : null}
              </div>
              {!compact ? (
                <p className="mt-1 max-w-full text-xs leading-relaxed text-muted italic">
                  {step.detail}
                </p>
              ) : null}
            </div>
          </button>
        );
      })}
    </div>
  );
}
