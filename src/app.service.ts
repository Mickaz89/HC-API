import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CreateFormDto } from './dtos/create-form.dto';
import { RedisService } from './redis.service';

@Injectable()
export class AppService {
  constructor(
    @Inject('DOC_SERVICE') private redisClient: ClientProxy,
    private readonly redisService: RedisService,
  ) {}

  async generateForm(createFormDto: CreateFormDto): Promise<string> {
    const jobId = uuidv4();
    await this.redisService.set(
      `jobId:${jobId}`,
      JSON.stringify({ status: 'pending', url: null }),
    );
    createFormDto.jobId = jobId;
    await this.redisClient.send('generate', createFormDto).toPromise();
    return jobId;
  }

  async getStatus(jobId: string) {
    const job = await this.redisService.get(`jobId:${jobId}`);
    return JSON.parse(job);
  }
}
