import { Module } from '@nestjs/common';

import { OpportunitiesModule } from './opportunities/opportunities.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './config/config.module';
import { RedisModule } from './redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    ConfigurationModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      ssl: {
        rejectUnauthorized: true,
      },
    }),
    OpportunitiesModule,
    UsersModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
