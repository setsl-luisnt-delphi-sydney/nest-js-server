import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(url: string): any {
    return {
      Service: 'Nest JS Server',
      version: 'v1.0.0',
      support: 'app.qbits.pl',
      url,
    };
  }
  getFavicon(): any {
    return '';
  }


}
