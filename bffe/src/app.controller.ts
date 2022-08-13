import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller('calendars')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('v1/post')
  @UseInterceptors(FileInterceptor('photos'))
  addPhoto(
    @Req() expressRequest: Request,
    @UploadedFile() data: Express.Multer.File,
  ): void {
    console.log('file:', data);
  }
}
