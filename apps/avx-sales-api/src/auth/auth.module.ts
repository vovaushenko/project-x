import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/repository/users.repository';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import { RedisModule } from 'src/redis/redis.module';
import { RedisTokenStorageService } from 'src/redis/token/redis-token.service';
import { PrismaModule } from 'src/prisma/prisma.module';

// https://medium.com/@0xAggelos/building-a-secure-authentication-system-with-nestjs-jwt-and-postgresql-e1b4833b6b4e

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    RedisTokenStorageService,
    AuthService,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    UsersService,
    UsersRepository,
    LocalStrategy,
    RedisTokenStorageService,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
