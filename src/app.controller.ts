import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateFormDto } from './dtos/create-form.dto';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generate')
  async generateForm(
    @Body() createFormDto: CreateFormDto,
  ): Promise<Observable<string>> {
    return this.appService.generateForm(createFormDto);
  }

  @Get('status')
  async getStatus() {
    return this.appService.getStatus();
  }
}
