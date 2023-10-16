import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import { RedisTokenStorageService } from 'src/redis/token/redis-token.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(JwtRefreshTokenStrategy.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisTokenStorageService: RedisTokenStorageService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordIsValid = await user.validatePassword(password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { id: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    await this.redisTokenStorageService.insert(user.id, refreshToken);

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async validateUser(email: string, password: string): Promise<any> {
    // TODO: update
    const user = await this.usersService.findUserByEmail(email);
    console.log({ user, password });
    if (user && (await user.validatePassword(password))) {
      return user;
    }
    return null;
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ access_token: string }> {
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken);
      await this.redisTokenStorageService.validate(decoded.id, refreshToken);
      const payload = { id: decoded.id, email: decoded.email };
      const accessToken = await this.jwtService.signAsync(payload);
      return { access_token: accessToken };
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async invalidateToken(accessToken: string): Promise<void> {
    try {
      const decoded = await this.jwtService.verifyAsync(accessToken);
      await this.redisTokenStorageService.invalidate(decoded.id);
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
