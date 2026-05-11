import {
  selloCheckoutConfig,
  selloDemoArticle,
  type SelloLicenseKey,
  type SelloMetaFields,
} from "./constants";
import { parseSelloContent } from "./license-parser";

export type SelloMeta = SelloMetaFields;

export function buildSelloMeta(options?: {
  payEndpoint?: string;
  license?: SelloLicenseKey;
  contentPda?: string;
  priceUSDC?: string;
  voiceId?: string;
}) {
  const payEndpoint = options?.payEndpoint ?? selloCheckoutConfig.meta.pay;
  const license = options?.license ?? selloCheckoutConfig.meta.license;
  const contentPda = options?.contentPda ?? selloDemoArticle.contentPda;
  const priceUSDC = options?.priceUSDC ?? selloCheckoutConfig.meta.priceUSDC;
  const voiceId = options?.voiceId ?? selloCheckoutConfig.meta.voiceId;

  return [
    `id:${selloDemoArticle.id}`,
    `license:${license}`,
    `author:${selloDemoArticle.author}`,
    `publisher:${selloDemoArticle.publisher.name}`,
    `pay:${payEndpoint}`,
    `onchain:solana:devnet:${contentPda}`,
    `price_usdc:${priceUSDC}`,
    `voice_id:${voiceId}`,
  ].join("|");
}

export function parseSelloMeta(html: string): SelloMeta | null {
  const tag = html.match(/<meta\s+[^>]*name=["']sello["'][^>]*>/i)?.[0];
  const content = tag?.match(/content=["']([^"']+)["']/i)?.[1];
  if (!content) return null;

  const fields = parseSelloContent(content);
  const license = fields.license;

  if (!license) return null;

  return {
    id: fields.id ?? selloDemoArticle.id,
    license: isSelloLicenseKey(license)
      ? license
      : selloCheckoutConfig.meta.license,
    author: fields.author ?? selloDemoArticle.author,
    publisher: fields.publisher ?? selloDemoArticle.publisher.name,
    pay: fields.pay ?? selloCheckoutConfig.meta.pay,
    onchain: fields.onchain ?? selloCheckoutConfig.meta.onchain,
    priceUSDC: fields.price_usdc ?? selloCheckoutConfig.meta.priceUSDC,
    voiceId: fields.voice_id ?? selloCheckoutConfig.meta.voiceId,
  };
}

function isSelloLicenseKey(value: string): value is SelloLicenseKey {
  return [
    "sello-free",
    "sello-nc",
    "sello-voice",
    "sello-pay",
    "sello-no-train",
  ].includes(value);
}
