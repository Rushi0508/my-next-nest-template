import { Injectable } from '@nestjs/common'
import { OpenAI } from 'openai'
import config from 'src/config'
import { safeParseJson } from 'src/common/utils/parse'
import { LLMRequest, RetryOptions } from './types/llm'

@Injectable()
export class LLMService {
  private readonly openai: OpenAI
  private readonly openai_gemini: OpenAI
  private readonly openai_perplexity: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: config().keys.llm.openai.apiKey,
    })
    this.openai_gemini = new OpenAI({
      apiKey: config().keys.llm.gemini.apiKey,
      baseURL: config().keys.llm.gemini.baseURL,
    })
    this.openai_perplexity = new OpenAI({
      apiKey: config().keys.llm.perplexity.apiKey,
      baseURL: config().keys.llm.perplexity.baseURL,
    })
  }

  private async retryOperation<T>(
    operation: () => Promise<T>,
    options: RetryOptions = { maxAttempts: 3, delayMs: 1000, strategy: 'exponential' },
  ): Promise<T> {
    let lastError: Error | null = null
    for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
      try {
        console.log(`Attempt ${attempt} of ${options.maxAttempts}...`)
        return await operation()
      } catch (error) {
        lastError = error as Error
        if (attempt === options.maxAttempts) break

        const delay = options.strategy === 'exponential' ? Math.pow(2, attempt - 1) * options.delayMs : options.delayMs

        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
    if (lastError) {
      throw lastError
    }
    throw new Error('Failed to complete operation')
  }

  public getModel(model: 'openai' | 'gemini' | 'perplexity') {
    if (model === 'openai') {
      return this.openai
    }
    if (model === 'gemini') {
      return this.openai_gemini
    }
    if (model === 'perplexity') {
      console.log('perplexity')
      return this.openai_perplexity
    }
    throw new Error('Invalid model')
  }

  public async generate<T extends string | object>({
    messages,
    responseFormat = 'string',
    modelConfig,
    options,
  }: LLMRequest) {
    const model = this.getModel(modelConfig.model)
    const response = await this.retryOperation(
      async () => {
        return await model.chat.completions.create({
          model: modelConfig.name,
          messages,
          response_format: responseFormat === 'json' ? { type: 'json_object' } : undefined,
          ...options,
        })
      },
      {
        delayMs: 1000,
        maxAttempts: 3,
        strategy: 'fixed',
      },
    )
    if (responseFormat === 'json') {
      const exactResponse = response.choices[0].message.content ?? '{}'
      const parsedContent = safeParseJson(exactResponse)
      return parsedContent as T
    }
    return response?.choices[0]?.message?.content as T
  }
}
