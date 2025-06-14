import bip39 from "bip39";
import crypto from "crypto";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

export function getMnemonic() {
  const randomBytes = crypto.randomBytes(16);
  const mnemonic = bip39.entropyToMnemonic(randomBytes.toString("hex"));
  return mnemonic;
}

export async function getSeed(mnemonic: string, passPhrase?: string) {
  const seed = await bip39.mnemonicToSeed(mnemonic, passPhrase);
  const seedBuffer = Buffer.from(seed).toString("hex");
  return seedBuffer;
}

export function getWallet(seed: string, walletNumber: number) {
  const path44Change = `m/44'/501'/${walletNumber}'/0'`;
  const derivedSeed = derivePath(path44Change, seed);
  const keypair = Keypair.fromSeed(derivedSeed.key);
  const publickey = keypair.publicKey.toBase58();
  const privatekey = bs58.encode(keypair.secretKey);
  return {
    publickey,
    privatekey,
  };
}
