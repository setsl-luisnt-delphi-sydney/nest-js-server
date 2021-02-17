import { Controller, Get, Redirect, Req } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Redirect('/api')
  getHome(): any {
    return;
  }

  @Get('/favicon.ico')
  getFavicon(): any {
    return '';
  }

  @Get('/api')
  getHomeApi(@Req() req): any {
    return this.appService.getHome(req.url);
  }
}
