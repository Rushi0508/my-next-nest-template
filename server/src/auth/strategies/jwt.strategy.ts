import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import config from '../../config'
import { RequestUser } from '../dto/request_user.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config().jwt.secret,
    })
  }

  validate(payload: RequestUser) {
    if (!payload.id || !payload.email) {
      throw new UnauthorizedException('Invalid token payload')
    }
    return payload
  }
}
