import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;
  private subscriber: Redis;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const redisOptions = {
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
    };

    this.client = new Redis(redisOptions);
    this.subscriber = new Redis(redisOptions);

    this.subscriber.on('pmessage', (pattern, channel, message) => {
      const parsedMessage = JSON.parse(message);
      console.log(parsedMessage.data);
    });

    this.subscriber.psubscribe('document*');
  }

  async set(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  async get(key: string): Promise<any> {
    const data = await this.client.get(key);
    return JSON.parse(data);
  }
}
