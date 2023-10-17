import { Module } from '@nestjs/common';
import { RedisApiCacheService } from './cache/redis-api-cache.service';
import { RedisTokenStorageService } from './token/redis-token.service';

@Module({
  providers: [RedisApiCacheService, RedisTokenStorageService],
})
export class RedisModule {}
