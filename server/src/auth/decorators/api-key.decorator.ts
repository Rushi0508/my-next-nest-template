import { SetMetadata } from '@nestjs/common'

export const IS_API_KEY_ENABLED_KEY = 'isApiKeyEnabled'
export const ApiKeyEnabled = () => SetMetadata(IS_API_KEY_ENABLED_KEY, true)
