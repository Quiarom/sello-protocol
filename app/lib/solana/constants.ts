import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import type { Address } from "@solana/kit";

export const SELLO_PROGRAM_ID_STRING =
  process.env.NEXT_PUBLIC_PROGRAM_ID ??
  "HhXvRpC6uDfCF6sHNWv3xD2yzyjpiEW17eeK13tFaycC";

export const SELLO_PROGRAM_ID = new PublicKey(SELLO_PROGRAM_ID_STRING);

// FORCED DEVNET FOR PRODUCTION LAUNCH
export const SOLANA_CLUSTER = "devnet";

export const SOLANA_RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ?? 
  process.env.NEXT_PUBLIC_RPC_URL ?? 
  clusterApiUrl(SOLANA_CLUSTER);

export const DEVNET_USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU" as Address;
// Reference only for future migration
// export const MAINNET_USDC_MINT = "EPjFW36vnWM2W3DwdGTvHg6vEbBtPyjtLGL1m524QN6f" as Address;

export const USDC_MINT = DEVNET_USDC_MINT;

export const USDC_MICROS_PER_USDC = 1_000_000;

export function buildExplorerUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `https://explorer.solana.com${normalized}?cluster=${SOLANA_CLUSTER}`;
}
