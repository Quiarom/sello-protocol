# Limitations

## Implemented

- Restored the Sello Protocol product routes inside `Frontend/sello-colosseum-clean`:
  landing, register, dashboard, protected article, and agent onboarding.
- Added a global Solana wallet connection button in the shared header using wallet-adapter UI.
- Added Solana helper files for program constants, PDAs, Anchor provider creation, and explorer links.
- Registration now derives a real content hash and real ContentSello PDA from the connected wallet.
- The protected article exposes a Sello meta tag and links to `llms.txt`, `tdm-policy.json`, and `rsl.txt`.
- The dashboard now has a dedicated On-chain Proof panel that distinguishes actual devnet signatures from demo placeholders.

## Demo / limited / roadmap

- `anchor/programs/sello/src/lib.rs` is protocol source of truth.
- `idl/sello.json` is checked-in Anchor IDL snapshot used by the browser-side Anchor helper in `app/lib/solana/sello-program.ts`.
- `app/generated/sello/*` is checked-in Codama client output; if it drifts from `anchor/programs/sello/src/lib.rs`, regenerate from fresh IDL before claiming parity.
- Current maintenance path is explicit: rebuild Anchor, sync `anchor/target/idl/sello.json` into `idl/sello.json`, then rerun Codama.
- `/api/narrate` now reads Appwrite defaults from the migrated source setup, but it still requires `APPWRITE_API_KEY` in `.env.local` before narration can execute through `fn-narrate`.
- The narration path still does not execute production x402 middleware, LI.FI bridging, or ElevenLabs narration unless the Appwrite function is fully deployed and configured.
- Usage receipt rendering in the protected article is demo-level UI state unless a future server flow records receipts on chain.
- `app/generated/sello` may still be stale relative to `anchor/programs/sello/src/lib.rs`; checked-in IDL snapshot reduces clean-build risk but does not remove codegen drift risk.
- No browser storage is used, so registration state is passed through URLs or recomputed from wallet and content hash instead of being persisted locally.
