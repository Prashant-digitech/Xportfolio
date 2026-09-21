/**
 * Environment configuration for OpenRouter AI Provider.
 * Reads environment variables without hardcoding any secrets.
 */

export interface AIEnvConfig {
  openrouterApiKey: string;
  openrouterBaseUrl: string;
  siteUrl?: string;
  siteName?: string;
  defaultTimeoutMs: number;
  maxRetriesPerModel: number;
}

export function getAIEnvConfig(): AIEnvConfig {
  const openrouterApiKey = process.env.OPENROUTER_API_KEY || "";
  const openrouterBaseUrl =
    process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
  const siteUrl = process.env.SITE_URL || "http://localhost:3000";
  const siteName = process.env.SITE_NAME || "Xportfolio AI Suite";

  const defaultTimeoutMs = parseInt(
    process.env.AI_TIMEOUT_MS || "30000",
    10
  );
  const maxRetriesPerModel = parseInt(
    process.env.AI_MAX_RETRIES_PER_MODEL || "2",
    10
  );

  return {
    openrouterApiKey,
    openrouterBaseUrl,
    siteUrl,
    siteName,
    defaultTimeoutMs,
    maxRetriesPerModel,
  };
}

export const env = getAIEnvConfig();
