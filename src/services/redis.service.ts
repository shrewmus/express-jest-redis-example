import Redis from 'ioredis';
import {ConfigService} from './config.service';

export class RedisService {
  public client: Redis;

  constructor(config: ConfigService) {
    this.client = new Redis({
      host: config.get('REDIS_HOST', 'localhost'),
      port: +config.get('REDIS_PORT', '6379'),
    });

    this.client.on('connect', () => {
      console.log('[LOG] Redis is connecting');
    });

    this.client.on('ready', () => {
      console.log('[LOG] Redis connected successfully');
    });

    this.client.on('error', (err) => {
      console.error('[ERROR] Redis connection error:', err);
    });

    this.client.on('reconnecting', () => {
      console.log('[LOG] Redis is reconnecting');
    });
  }

  async readKey(key: string) {
    return await this.client.get(key);
  }

  async disconnect() {
    return await this.client.quit();
  }

}
