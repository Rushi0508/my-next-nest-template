import { ChatCompletionMessageParam } from 'openai/resources/chat'

import { ChatCompletionCreateParamsNonStreaming } from 'openai/resources/chat'

export type LLMModel = 'gemini'

export type RetryOptions = {
  maxAttempts: number
  delayMs: number
  strategy: 'fixed' | 'exponential'
}

export type LLMRequest = {
  messages: ChatCompletionMessageParam[]
  responseFormat?: 'string' | 'json'
  modelConfig: {
    model: 'openai' | 'gemini' | 'perplexity'
    name: string
  }
  options?: Partial<ChatCompletionCreateParamsNonStreaming>
}
