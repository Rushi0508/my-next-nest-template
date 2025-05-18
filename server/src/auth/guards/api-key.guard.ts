import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import config from 'src/config'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly validApiKey = config().keys.apiKey

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const apiKey = request.headers['x-api-key'] || request.headers['X-API-KEY'] || ''
    const isApiKeyValid = apiKey === this.validApiKey

    if (isApiKeyValid) {
      return true
    }

    throw new UnauthorizedException('Invalid or missing authentication')
  }
}
