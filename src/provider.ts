/**
 * Low-level OpenAI-compatible provider for OpenRouter API.
 * Handles fetch execution, rate limiting retries, backoff, streaming, tools, and health checks.
 */

import { env } from "./env";
import { aiConfig, ModelCapability } from "./config";

export interface ChatMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string | null;
  name?: string;
  tool_call_id?: string;
  tool_calls?: ToolCall[];
}

export interface ToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

export interface ToolDefinition {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters: Record<string, unknown>;
  };
}

export interface ProviderCompletionOptions {
  modelId: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stream?: boolean;
  tools?: ToolDefinition[];
  toolChoice?: "auto" | "none" | "required" | { type: "function"; function: { name: string } };
  responseFormat?: { type: "json_object" | "text" };
  signal?: AbortSignal;
}

export interface ProviderCompletionResponse {
  id: string;
  model: string;
  content: string;
  toolCalls?: ToolCall[];
  finishReason: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface HealthCheckResult {
  provider: string;
  status: "healthy" | "degraded" | "unreachable";
  baseUrl: string;
  hasApiKey: boolean;
  availableFreeModels: string[];
  latencyMs: number;
  error?: string;
}

/**
 * OpenRouter Provider Class
 */
export class OpenRouterProvider {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = env.openrouterBaseUrl.replace(/\/$/, "");
    this.apiKey = env.openrouterApiKey;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "HTTP-Referer": env.siteUrl || "http://localhost:3000",
      "X-Title": env.siteName || "Xportfolio AI",
    };

    if (this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`;
    }

    return headers;
  }

  /**
   * Exponential delay helper
   */
  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Send a single model chat completion with exponential backoff & rate limit handling
   */
  public async executeChatCompletion(
    options: ProviderCompletionOptions
  ): Promise<ProviderCompletionResponse> {
    const {
      modelId,
      messages,
      temperature = 0.7,
      maxTokens = 2048,
      topP = 1.0,
      tools,
      toolChoice,
      responseFormat,
    } = options;

    const payload: Record<string, unknown> = {
      model: modelId,
      messages,
      temperature,
      max_tokens: maxTokens,
      top_p: topP,
      stream: false,
    };

    if (tools && tools.length > 0) {
      payload.tools = tools;
      if (toolChoice) {
        payload.tool_choice = toolChoice;
      }
    }

    if (responseFormat) {
      payload.response_format = responseFormat;
    }

    let attempt = 0;
    const maxRetries = aiConfig.retry.maxRetriesPerModel;
    let delayMs = aiConfig.retry.initialDelayMs;

    while (attempt <= maxRetries) {
      attempt++;
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        aiConfig.timeoutMs
      );

      try {
        if (aiConfig.enableLogging) {
          console.log(
            `[AI Provider] Attempt ${attempt}/${maxRetries + 1} sending request to model: ${modelId}`
          );
        }

        const response = await fetch(`${this.baseUrl}/chat/completions`, {
          method: "POST",
          headers: this.getHeaders(),
          body: JSON.stringify(payload),
          signal: options.signal || controller.signal,
        });

        clearTimeout(timeoutId);

        // Handle Rate Limiting (429) & Server Retries (500, 502, 503, 504)
        if (response.status === 429 || response.status >= 500) {
          const errorText = await response.text();
          const retryAfterHeader = response.headers.get("retry-after");
          const retryAfterMs = retryAfterHeader
            ? parseInt(retryAfterHeader, 10) * 1000
            : delayMs;

          if (attempt <= maxRetries) {
            if (aiConfig.enableLogging) {
              console.warn(
                `[AI Provider] Model ${modelId} returned HTTP ${response.status}. Retrying in ${retryAfterMs}ms... Error: ${errorText}`
              );
            }
            await this.delay(retryAfterMs);
            delayMs = Math.min(
              delayMs * aiConfig.retry.backoffFactor,
              aiConfig.retry.maxDelayMs
            );
            continue;
          } else {
            throw new Error(
              `Model ${modelId} failed with status ${response.status} after ${maxRetries + 1} attempts. Payload: ${errorText}`
            );
          }
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP Error ${response.status} from ${modelId}: ${errorText}`
          );
        }

        const data = await response.json();
        const choice = data.choices?.[0];

        if (!choice) {
          throw new Error(`Invalid response structure from model ${modelId}: missing choices`);
        }

        return {
          id: data.id || `resp-${Date.now()}`,
          model: data.model || modelId,
          content: choice.message?.content || "",
          toolCalls: choice.message?.tool_calls,
          finishReason: choice.finish_reason || "stop",
          usage: data.usage
            ? {
                promptTokens: data.usage.prompt_tokens || 0,
                completionTokens: data.usage.completion_tokens || 0,
                totalTokens: data.usage.total_tokens || 0,
              }
            : undefined,
        };
      } catch (err: unknown) {
        clearTimeout(timeoutId);
        const isAbort =
          err instanceof Error &&
          (err.name === "AbortError" || err.message.includes("aborted"));

        if (attempt <= maxRetries && !isAbort) {
          if (aiConfig.enableLogging) {
            console.warn(
              `[AI Provider] Transient error on ${modelId} (attempt ${attempt}): ${(err as Error).message}. Retrying in ${delayMs}ms...`
            );
          }
          await this.delay(delayMs);
          delayMs = Math.min(
            delayMs * aiConfig.retry.backoffFactor,
            aiConfig.retry.maxDelayMs
          );
        } else {
          throw err;
        }
      }
    }

    throw new Error(`Model ${modelId} execution failed after all retries.`);
  }

  /**
   * Send a streaming chat completion request
   */
  public async executeStreamingChatCompletion(
    options: ProviderCompletionOptions,
    onChunk: (chunk: string, raw?: unknown) => void
  ): Promise<ProviderCompletionResponse> {
    const {
      modelId,
      messages,
      temperature = 0.7,
      maxTokens = 2048,
      topP = 1.0,
      tools,
      toolChoice,
    } = options;

    const payload: Record<string, unknown> = {
      model: modelId,
      messages,
      temperature,
      max_tokens: maxTokens,
      top_p: topP,
      stream: true,
    };

    if (tools && tools.length > 0) {
      payload.tools = tools;
      if (toolChoice) payload.tool_choice = toolChoice;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      aiConfig.timeoutMs
    );

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
        signal: options.signal || controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Streaming HTTP Error ${response.status} from ${modelId}: ${errorText}`
        );
      }

      if (!response.body) {
        throw new Error(`Response body is empty for streaming request to ${modelId}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullContent = "";
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith(":")) continue;

          if (trimmed === "data: [DONE]") {
            break;
          }

          if (trimmed.startsWith("data: ")) {
            const dataStr = trimmed.slice(6);
            try {
              const parsed = JSON.parse(dataStr);
              const deltaContent = parsed.choices?.[0]?.delta?.content || "";
              if (deltaContent) {
                fullContent += deltaContent;
                onChunk(deltaContent, parsed);
              }
            } catch {
              // Parse error on incomplete chunk line, skip
            }
          }
        }
      }

      return {
        id: `stream-${Date.now()}`,
        model: modelId,
        content: fullContent,
        finishReason: "stop",
      };
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }

  /**
   * Health Check for Provider & Available Models
   */
  public async checkProviderHealth(): Promise<HealthCheckResult> {
    const startTime = Date.now();
    const hasApiKey = Boolean(this.apiKey && this.apiKey.length > 5);

    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const latencyMs = Date.now() - startTime;

      if (!response.ok) {
        return {
          provider: "openrouter",
          status: "degraded",
          baseUrl: this.baseUrl,
          hasApiKey,
          availableFreeModels: [],
          latencyMs,
          error: `HTTP ${response.status} reading /models`,
        };
      }

      const data = await response.json();
      const modelList: Array<{ id: string }> = data.data || [];
      const freeModelIds = modelList
        .map((m) => m.id)
        .filter((id) => id.endsWith(":free") || id === "openrouter/free");

      return {
        provider: "openrouter",
        status: "healthy",
        baseUrl: this.baseUrl,
        hasApiKey,
        availableFreeModels: freeModelIds,
        latencyMs,
      };
    } catch (err: unknown) {
      return {
        provider: "openrouter",
        status: "unreachable",
        baseUrl: this.baseUrl,
        hasApiKey,
        availableFreeModels: [],
        latencyMs: Date.now() - startTime,
        error: (err as Error).message,
      };
    }
  }

  /**
   * Detect model capabilities dynamically or return configured capability
   */
  public getModelCapabilities(modelId: string): ModelCapability {
    const found = aiConfig.fallbackModels.find((m) => m.id === modelId);
    if (found) return found;

    return {
      id: modelId,
      name: modelId,
      description: "Custom OpenRouter Model",
      contextWindow: 32768,
      supportsStreaming: true,
      supportsToolCalling: true,
      supportsJSONOutput: true,
      supportsSystemPrompt: true,
      isFree: true,
    };
  }
}

export const provider = new OpenRouterProvider();
