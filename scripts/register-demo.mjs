import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, Keypair, Connection } from "@solana/web3.js";
import fs from "fs";
import os from "os";

// Config
const PROGRAM_ID = "3P8km3sUTKc5EZywxVxPoFFFJzPxWGjVHtKLSU2iy7mY";
const KEYPAIR_PATH = os.homedir() + "/.config/solana/id-sello-devnet.json";

async function main() {
    const idl = JSON.parse(fs.readFileSync("./idl/sello.json", "utf8"));
    const keypairData = JSON.parse(fs.readFileSync(KEYPAIR_PATH, "utf8"));
    const wallet = Keypair.fromSecretKey(new Uint8Array(keypairData));

    const provider = new anchor.AnchorProvider(
        new Connection("https://api.devnet.solana.com"),
        new anchor.Wallet(wallet),
        { commitment: "confirmed" }
    );

    const program = new Program(idl, provider);

    const contentHashHex = "41f2b87bb2f4f4fe4a8a7b9f9d3d2a0c1b5e7d9a3f2c4e6d8b0a1c3e5f7a9b1";
    // Anchor converts JS arrays sent to [u8; 32] differently than a direct Buffer.from(..., "hex").
    // To match what happens in the frontend and codama (getBase16Encoder().encode),
    // we manually parse the hex string into an array of integers exactly as getBase16Encoder does.
    const contentHashArray = [];
    for (let i = 0; i < contentHashHex.length; i += 2) {
      contentHashArray.push(parseInt(contentHashHex.substr(i, 2), 16));
    }
    const contentHash = Buffer.from(contentHashArray);

    const [pda] = PublicKey.findProgramAddressSync(
        [Buffer.from("sello"), wallet.publicKey.toBuffer(), contentHash],
        new PublicKey(PROGRAM_ID)
    );
    console.log("Derived PDA:", pda.toBase58());

    console.log("Registering demo content sello...");
    try {
        const tx = await program.methods.registerContentSello(
            Array.from(contentHash),
            1, // sello-voice
            1, // voice (or other usage)
            true, // attribution required
            new anchor.BN(100000) // 0.10 USDC
        ).accounts({
            contentSello: pda,
            creator: wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        }).rpc();
        console.log("Success! TX:", tx);
    } catch (err) {
        if (err.message.includes("already in use")) {
            console.log("Demo article already registered.");
        } else {
            throw err;
        }
    }
}

main().catch(console.error);
