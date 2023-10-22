import { Module } from '@nestjs/common';

import { OpportunitiesModule } from './opportunities/opportunities.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './config/config.module';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigurationModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    OpportunitiesModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
