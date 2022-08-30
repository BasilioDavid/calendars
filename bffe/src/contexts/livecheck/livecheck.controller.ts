import { Controller, Get } from '@nestjs/common';

@Controller()
export class LivecheckController {
  @Get('livecheck')
  live() {
    return 'livecheck';
  }
}
