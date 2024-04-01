import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateFormDto } from './dtos/create-form.dto';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generate')
  async generateForm(@Body() createFormDto: CreateFormDto): Promise<string> {
    return this.appService.generateForm(createFormDto);
  }

  @Get('job-status/:id')
  async getStatus(@Param('id') jobId: string) {
    return this.appService.getStatus(jobId);
  }
}
