/**
 * Main AI Client Abstraction with Automatic Free Model Fallback Engine.
 * Supports text generation, SSE streaming, structured JSON output, tool calling, and health monitoring.
 */

import { provider, ChatMessage, ToolDefinition, ToolCall, ProviderCompletionResponse } from "./provider";
import { aiConfig, ModelCapability } from "./config";
import { env } from "./env";

export interface AIGenerateOptions {
  prompt?: string;
  messages?: ChatMessage[];
  system?: string;
  temperature?: number;
  maxTokens?: number;
  tools?: ToolDefinition[];
  toolChoice?: "auto" | "none" | "required" | { type: "function"; function: { name: string } };
  responseFormat?: { type: "json_object" | "text" };
  signal?: AbortSignal;
}

export interface AIResult {
  success: boolean;
  content: string;
  modelUsed?: string;
  fallbackCount: number;
  attemptsHistory: Array<{ model: string; error?: string; timeMs: number }>;
  toolCalls?: ToolCall[];
  error?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIStreamOptions extends AIGenerateOptions {
  onChunk: (chunk: string, model: string) => void;
}

/**
 * AI Client Class managing automatic priority fallbacks
 */
export class AIClient {
  private models: ModelCapability[];

  constructor() {
    this.models = aiConfig.fallbackModels;
  }

  /**
   * Helper to normalize user input into standard ChatMessage format
   */
  private prepareMessages(options: AIGenerateOptions): ChatMessage[] {
    const messages: ChatMessage[] = [];

    if (options.system) {
      messages.push({ role: "system", content: options.system });
    }

    if (options.messages && options.messages.length > 0) {
      messages.push(...options.messages);
    } else if (options.prompt) {
      messages.push({ role: "user", content: options.prompt });
    }

    if (messages.length === 0) {
      messages.push({ role: "user", content: "Hello" });
    }

    return messages;
  }

  /**
   * Generate text with automatic model fallback loop.
   * Model #1 -> Model #2 -> Model #3 ... -> Model #6
   */
  public async generateText(options: AIGenerateOptions): Promise<AIResult> {
    const messages = this.prepareMessages(options);
    const attemptsHistory: Array<{ model: string; error?: string; timeMs: number }> = [];
    let fallbackCount = 0;

    for (const modelCap of this.models) {
      const modelId = modelCap.id;
      const startTime = Date.now();

      if (aiConfig.enableLogging) {
        console.log(`[AI Core] Trying model priority #${fallbackCount + 1}: ${modelId}`);
      }

      try {
        const response: ProviderCompletionResponse = await provider.executeChatCompletion({
          modelId,
          messages,
          temperature: options.temperature,
          maxTokens: options.maxTokens,
          tools: options.tools,
          toolChoice: options.toolChoice,
          responseFormat: options.responseFormat,
          signal: options.signal,
        });

        const duration = Date.now() - startTime;
        attemptsHistory.push({ model: modelId, timeMs: duration });

        if (aiConfig.enableLogging) {
          console.log(`[AI Core] Success with model: ${modelId} (${duration}ms)`);
        }

        return {
          success: true,
          content: response.content,
          modelUsed: response.model || modelId,
          fallbackCount,
          attemptsHistory,
          toolCalls: response.toolCalls,
          usage: response.usage,
        };
      } catch (err: unknown) {
        const duration = Date.now() - startTime;
        const errorMessage = (err as Error).message || String(err);

        attemptsHistory.push({ model: modelId, error: errorMessage, timeMs: duration });

        if (aiConfig.enableLogging) {
          console.warn(
            `[AI Core] Model #${fallbackCount + 1} (${modelId}) failed: ${errorMessage}. Triggering fallback...`
          );
        }

        fallbackCount++;
      }
    }

    // Every model failed
    const errorSummary = attemptsHistory
      .map((a) => `${a.model}: ${a.error}`)
      .join(" | ");

    console.error(`[AI Core] ALL FREE MODELS EXHAUSTED AND FAILED. Summary: ${errorSummary}`);

    return {
      success: false,
      content: "",
      fallbackCount,
      attemptsHistory,
      error: `All free models failed to respond. Detailed errors: ${errorSummary}`,
    };
  }

  /**
   * Stream text responses with fallback before stream initialization
   */
  public async streamText(options: AIStreamOptions): Promise<AIResult> {
    const messages = this.prepareMessages(options);
    const attemptsHistory: Array<{ model: string; error?: string; timeMs: number }> = [];
    let fallbackCount = 0;

    for (const modelCap of this.models) {
      const modelId = modelCap.id;
      const startTime = Date.now();

      if (aiConfig.enableLogging) {
        console.log(`[AI Core] Stream attempt using model priority #${fallbackCount + 1}: ${modelId}`);
      }

      try {
        const response = await provider.executeStreamingChatCompletion(
          {
            modelId,
            messages,
            temperature: options.temperature,
            maxTokens: options.maxTokens,
            tools: options.tools,
            toolChoice: options.toolChoice,
            signal: options.signal,
          },
          (chunk) => options.onChunk(chunk, modelId)
        );

        const duration = Date.now() - startTime;
        attemptsHistory.push({ model: modelId, timeMs: duration });

        return {
          success: true,
          content: response.content,
          modelUsed: modelId,
          fallbackCount,
          attemptsHistory,
        };
      } catch (err: unknown) {
        const duration = Date.now() - startTime;
        const errorMessage = (err as Error).message || String(err);
        attemptsHistory.push({ model: modelId, error: errorMessage, timeMs: duration });

        if (aiConfig.enableLogging) {
          console.warn(`[AI Core] Streaming failed on model ${modelId}: ${errorMessage}. Falling back...`);
        }

        fallbackCount++;
      }
    }

    return {
      success: false,
      content: "",
      fallbackCount,
      attemptsHistory,
      error: "All free models failed for streaming request.",
    };
  }

  /**
   * Generate structured JSON output with validation & fallback
   */
  public async generateJSON<T = Record<string, unknown>>(
    options: AIGenerateOptions
  ): Promise<{ success: boolean; data?: T; rawText: string; modelUsed?: string; error?: string }> {
    const jsonSystem = `${options.system || "You are a helpful assistant."}\nIMPORTANT: You MUST reply with valid JSON only. Do not include markdown backticks or explanations outside the JSON object.`;

    const result = await this.generateText({
      ...options,
      system: jsonSystem,
      responseFormat: { type: "json_object" },
    });

    if (!result.success || !result.content) {
      return {
        success: false,
        rawText: "",
        error: result.error || "Failed to generate AI response",
      };
    }

    try {
      // Clean possible backtick wrappers if model included them
      let cleaned = result.content.trim();
      if (cleaned.startsWith("```json")) {
        cleaned = cleaned.replace(/^```json/, "").replace(/```$/, "").trim();
      } else if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
      }

      const parsed = JSON.parse(cleaned) as T;
      return {
        success: true,
        data: parsed,
        rawText: result.content,
        modelUsed: result.modelUsed,
      };
    } catch (err) {
      return {
        success: false,
        rawText: result.content,
        modelUsed: result.modelUsed,
        error: `Failed to parse AI output as JSON: ${(err as Error).message}`,
      };
    }
  }

  /**
   * Run function / tool calling loop
   */
  public async callTools(
    options: AIGenerateOptions & {
      tools: ToolDefinition[];
      toolExecutor?: (toolCall: ToolCall) => Promise<string>;
    }
  ): Promise<AIResult> {
    const initialResult = await this.generateText(options);

    if (!initialResult.success) {
      return initialResult;
    }

    if (initialResult.toolCalls && initialResult.toolCalls.length > 0 && options.toolExecutor) {
      const messages = this.prepareMessages(options);
      
      messages.push({
        role: "assistant",
        content: initialResult.content || null,
        tool_calls: initialResult.toolCalls,
      });

      for (const toolCall of initialResult.toolCalls) {
        if (aiConfig.enableLogging) {
          console.log(`[AI Core] Executing tool: ${toolCall.function.name}`);
        }

        try {
          const toolOutput = await options.toolExecutor(toolCall);
          messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            name: toolCall.function.name,
            content: toolOutput,
          });
        } catch (err) {
          messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            name: toolCall.function.name,
            content: `Error executing tool: ${(err as Error).message}`,
          });
        }
      }

      // Final completion after tool outputs
      return this.generateText({
        ...options,
        messages,
      });
    }

    return initialResult;
  }

  /**
   * Health check diagnostic for overall AI suite
   */
  public async healthCheck() {
    const providerHealth = await provider.checkProviderHealth();
    return {
      status: providerHealth.status,
      apiKeyConfigured: Boolean(env.openrouterApiKey),
      baseUrl: env.openrouterBaseUrl,
      configuredModels: this.models.map((m) => ({ id: m.id, name: m.name })),
      providerHealth,
    };
  }
}

export const ai = new AIClient();

// Convenience function exports
export const generateText = (opts: AIGenerateOptions) => ai.generateText(opts);
export const streamText = (opts: AIStreamOptions) => ai.streamText(opts);
export const generateJSON = <T = Record<string, unknown>>(opts: AIGenerateOptions) => ai.generateJSON<T>(opts);
export const callTools = (opts: AIGenerateOptions & { tools: ToolDefinition[]; toolExecutor?: (t: ToolCall) => Promise<string> }) => ai.callTools(opts);
export const checkAIHealth = () => ai.healthCheck();
