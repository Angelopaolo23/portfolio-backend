import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Amiguito deje eso ahi, eso no es suyo!';
  }
}
