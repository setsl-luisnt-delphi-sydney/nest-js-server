import { Controller, Get } from '@nestjs/common'
import { AppService } from '../services/app.service'

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHome(): string {
    return this.appService.getHome();
  }
}
