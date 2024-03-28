import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('DOC_SERVICE') private redisClient: ClientProxy) {}
  getHello(): Observable<string> {
    return this.redisClient.send('hello', {});
  }
}
