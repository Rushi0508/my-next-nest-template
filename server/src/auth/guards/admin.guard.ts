import { ExecutionContext, Injectable, UnauthorizedException, CanActivate } from '@nestjs/common'
import { RequestUser } from '../dto/request_user.dto'
import { Reflector } from '@nestjs/core'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user as RequestUser

    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [context.getHandler(), context.getClass()])
    const isApiKeyEnabled = this.reflector.getAllAndOverride<boolean>('isApiKeyEnabled', [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    if (isApiKeyEnabled) {
      return true
    }

    if (!user || !user.id) {
      throw new UnauthorizedException('User not authenticated')
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedException('User is not authorized to access this resource')
    }

    return true
  }
}
