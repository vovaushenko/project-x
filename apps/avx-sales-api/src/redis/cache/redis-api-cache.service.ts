import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisApiCacheService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: Redis;
  constructor(private configService: ConfigService) {}
  onApplicationBootstrap() {
    this.redisClient = new Redis({
      host: '127.0.0.1' || this.configService.get('REDIS_HOST'),
      port: 6379 || this.configService.get('REDIS_PORT'),
    });
  }

  onApplicationShutdown() {
    return this.redisClient.quit();
  }
}
