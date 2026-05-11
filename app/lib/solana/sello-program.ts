import { BN, type Idl } from "@coral-xyz/anchor";
import type { Connection, PublicKey } from "@solana/web3.js";
import type { WalletContextState } from "@solana/wallet-adapter-react";
import selloIdl from "@/idl/sello.json";
import { buildExplorerUrl, SELLO_PROGRAM_ID_STRING } from "./constants";
import { createAnchorProgram, hasAnchorWallet } from "./provider";

/**
 * Solana truth split:
 * - `anchor/programs/sello/src/lib.rs` is protocol source of truth.
 * - `idl/sello.json` is checked-in Anchor IDL snapshot for browser-side Anchor helper.
 * - `app/generated/sello/*` is checked-in Codama client generated from IDL.
 *
 * When program changes:
 * 1. rebuild Anchor program
 * 2. sync `anchor/target/idl/sello.json` -> `idl/sello.json`
 * 3. regenerate `app/generated/sello/*`
 */
export const SELLO_IDL = selloIdl as Idl;

export function getSelloProgram(
  connection: Connection,
  wallet: WalletContextState
) {
  if (!hasAnchorWallet(wallet)) {
    return null;
  }

  return createAnchorProgram(
    SELLO_IDL,
    connection,
    wallet,
    SELLO_PROGRAM_ID_STRING
  );
}

export function toFixedUsdcMicros(value: string) {
  return new BN(Math.round(Number.parseFloat(value || "0") * 1_000_000));
}

export function toAnchorBytes32(bytes: Uint8Array) {
  return Array.from(bytes.slice(0, 32));
}

export function explorerAddressUrl(address: string | PublicKey) {
  return buildExplorerUrl(`/address/${address.toString()}`);
}

export function explorerTxUrl(signature: string) {
  return buildExplorerUrl(`/tx/${signature}`);
}
