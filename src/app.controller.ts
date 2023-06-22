import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './utils/decorator/auth.decorator';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
