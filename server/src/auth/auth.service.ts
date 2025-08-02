import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Auth, google } from 'googleapis';
import { config } from 'src/common/config';

@Injectable()
export class AuthService {
  private oauth2Client: Auth.OAuth2Client;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      config.google.clientId,
      config.google.clientSecret,
      config.google.callbackUrl,
    );
  }

  async handleGoogleAuth(idToken: string) {
    const ticket = await this.oauth2Client.verifyIdToken({
      idToken,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid google id token');
    }
    const { email, sub: googleId, given_name, family_name, picture } = payload;
    if (!email) {
      throw new UnauthorizedException('Invalid google id token');
    }
    let user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name: `${given_name} ${family_name}`,
          avatarUrl: picture,
        },
      });
    }
    const jwtPayload = {
      id: user.id,
      email,
      avatarUrl: user?.avatarUrl,
      name: user?.name ?? 'Unknown',
      sub: googleId,
    };

    const token = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: config.jwt.expiresIn,
    });
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    };
  }
}
