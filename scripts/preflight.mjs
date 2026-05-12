/**
 * Sello Protocol — Production Pre-Flight Check
 * Ensures the environment is ready for Vercel + Appwrite Cloud deployment.
 */

import { PublicKey } from "@solana/web3.js";

const REQUIRED_VARS = [
  "NEXT_PUBLIC_SOLANA_RPC_URL",
  "NEXT_PUBLIC_APPWRITE_ENDPOINT",
  "NEXT_PUBLIC_APPWRITE_PROJECT_ID",
  "APPWRITE_API_KEY",
  "ELEVENLABS_API_KEY",
];

const DEVNET_USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";

async function runCheck() {
  console.log("🚀 STARTING SELLO PRE-FLIGHT (DEVNET PROD)...\n");
  let errors = 0;
  let warnings = 0;

  // 1. Check Env Vars existence
  console.log("📋 Checking Environment Variables...");
  for (const v of REQUIRED_VARS) {
    if (!process.env[v]) {
      if (v === "NEXT_PUBLIC_SOLANA_RPC_URL") {
        console.warn(`⚠️  WARNING: ${v} is missing. Using Solana Public RPC (Risk of 429 errors).`);
        warnings++;
      } else {
        console.error(`❌ MISSING: ${v}`);
        errors++;
      }
    } else {
      console.log(`✅ FOUND: ${v}`);
    }
  }

  // 2. Validate Solana Network (Must be Devnet)
  const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "";
  if (rpcUrl.includes("mainnet")) {
    console.error("❌ ERROR: RPC URL points to MAINNET but launch is locked to DEVNET.");
    errors++;
  } else {
    console.log("✅ RPC: Points to a non-mainnet endpoint (Safe).");
  }

  // 3. Validate Addresses
  try {
    const programId = process.env.NEXT_PUBLIC_SELLO_PROGRAM_ID || "3P8km3sUTKc5EZywxVxPoFFFJzPxWGjVHtKLSU2iy7mY";
    new PublicKey(programId);
    console.log(`✅ Program ID (${programId}) is valid.`);
  } catch (e) {
    console.error("❌ INVALID: NEXT_PUBLIC_SELLO_PROGRAM_ID is not a valid Solana address.");
    errors++;
  }

  // 4. Appwrite Cloud Check
  const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "";
  if (!appwriteEndpoint.includes("cloud.appwrite.io")) {
    console.warn("⚠️ WARNING: Appwrite endpoint is NOT Appwrite Cloud. Ensure your local/self-hosted instance is reachable from Vercel.");
    warnings++;
  }

  console.log("\n-------------------------------------------");
  if (errors > 0) {
    console.log(`❌ FAILED: ${errors} errors found. FIX THEM BEFORE DEPLOYING!`);
    process.exit(1);
  } else {
    console.log(`🎉 SUCCESS: Ready for deployment. (${warnings} warnings to review)`);
    if (warnings === 0) {
        console.log("✨ CLEAN FLIGHT. GO FOR IT!");
    }
  }
}

runCheck().catch(err => {
    console.error("Pre-flight script crashed:", err);
    process.exit(1);
});
