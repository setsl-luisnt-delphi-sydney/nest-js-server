import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): any {
    return {
      Service: "Nest JS Server",
      version: "v1.0.0",
      support: "app.qbits.pl"
    }
  }
  getFavicon(): any {
    return 'https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/src/favicon.ico'
  }
}
