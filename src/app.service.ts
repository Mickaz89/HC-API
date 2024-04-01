import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateFormDto } from './dtos/create-form.dto';
import { RedisService } from './redis.service';

@Injectable()
export class AppService {
  constructor(
    @Inject('DOC_SERVICE') private redisClient: ClientProxy,
    private readonly redisService: RedisService,
  ) {}

  async generateForm(
    createFormDto: CreateFormDto,
  ): Promise<Observable<string>> {
    await this.redisService.set('status', 'pending');
    return this.redisClient.send('generate', createFormDto);
  }

  async getStatus() {
    return await this.redisService.get('status');
  }
}
