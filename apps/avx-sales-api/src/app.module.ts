import { Module } from '@nestjs/common';

import { OpportunitiesModule } from './opportunities/opportunities.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './config/config.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigurationModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    OpportunitiesModule,
    UsersModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
