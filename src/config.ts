/**
 * Central AI configuration module for free OpenRouter coding models.
 * Priority order and capability flags are configured here.
 */

export interface ModelCapability {
  id: string;
  name: string;
  description: string;
  contextWindow: number;
  supportsStreaming: boolean;
  supportsToolCalling: boolean;
  supportsJSONOutput: boolean;
  supportsSystemPrompt: boolean;
  isFree: true;
}

export interface RetryBackoffConfig {
  initialDelayMs: number;
  maxDelayMs: number;
  backoffFactor: number;
  maxRetriesPerModel: number;
}

export interface AIProviderConfig {
  primaryProvider: "openrouter";
  fallbackModels: ModelCapability[];
  retry: RetryBackoffConfig;
  timeoutMs: number;
  enableLogging: boolean;
}

/**
 * Priority Order (ONLY FREE MODELS)
 * 1. qwen/qwen3-coder:free
 * 2. nvidia/nemotron-3-super-120b-a12b:free
 * 3. tencent/hy3:free
 * 4. z-ai/glm-4.5-air:free
 * 5. deepseek/deepseek-v4-flash:free
 * 6. openrouter/free (automatic router)
 */
export const FREE_MODELS: ModelCapability[] = [
  {
    id: "qwen/qwen3-coder:free",
    name: "Qwen 3 Coder (Free)",
    description: "State-of-the-art free coding and agentic model by Alibaba Cloud Qwen",
    contextWindow: 32768,
    supportsStreaming: true,
    supportsToolCalling: true,
    supportsJSONOutput: true,
    supportsSystemPrompt: true,
    isFree: true,
  },
  {
    id: "nvidia/nemotron-3-super-120b-a12b:free",
    name: "NVIDIA Nemotron 3 Super 120B (Free)",
    description: "High performance 120B parameter reasoning and code model by NVIDIA",
    contextWindow: 32768,
    supportsStreaming: true,
    supportsToolCalling: true,
    supportsJSONOutput: true,
    supportsSystemPrompt: true,
    isFree: true,
  },
  {
    id: "tencent/hy3:free",
    name: "Tencent Hunyuan 3 (Free)",
    description: "Advanced multilingual coding and reasoning foundation model by Tencent",
    contextWindow: 32768,
    supportsStreaming: true,
    supportsToolCalling: true,
    supportsJSONOutput: true,
    supportsSystemPrompt: true,
    isFree: true,
  },
  {
    id: "z-ai/glm-4.5-air:free",
    name: "GLM 4.5 Air (Free)",
    description: "Fast lightweight coding and chat model by Zhipu AI",
    contextWindow: 128000,
    supportsStreaming: true,
    supportsToolCalling: true,
    supportsJSONOutput: true,
    supportsSystemPrompt: true,
    isFree: true,
  },
  {
    id: "deepseek/deepseek-v4-flash:free",
    name: "DeepSeek V4 Flash (Free)",
    description: "Ultra-fast code generation model by DeepSeek",
    contextWindow: 64000,
    supportsStreaming: true,
    supportsToolCalling: true,
    supportsJSONOutput: true,
    supportsSystemPrompt: true,
    isFree: true,
  },
  {
    id: "openrouter/free",
    name: "OpenRouter Auto Free Router",
    description: "Automatic OpenRouter meta-router selecting the best currently available free model",
    contextWindow: 32768,
    supportsStreaming: true,
    supportsToolCalling: true,
    supportsJSONOutput: true,
    supportsSystemPrompt: true,
    isFree: true,
  },
];

export const aiConfig: AIProviderConfig = {
  primaryProvider: "openrouter",
  fallbackModels: FREE_MODELS,
  retry: {
    initialDelayMs: 1000,
    maxDelayMs: 8000,
    backoffFactor: 2,
    maxRetriesPerModel: 2,
  },
  timeoutMs: 30000,
  enableLogging: true,
};

export default aiConfig;
