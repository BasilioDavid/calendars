import { Injectable } from '@nestjs/common';
import { Month } from '../../../shared/building-blocks/month.value-object';
import { GenerateImageService } from '../core/generate-image.service';
import { GetCalendarImagesNameRepository } from '../core/repositories/get-calendar-images-name.repository';
import { ImageLoaderRepository } from '../core/repositories/image-loader.repository';

@Injectable()
export class GenerateCalendarService {
  constructor(
    private readonly calendarRepository: GetCalendarImagesNameRepository,
    private readonly imageLoader: ImageLoaderRepository,
    private readonly generateImage: GenerateImageService
  ) {}

  async generate({ calendarExtId }: { calendarExtId: string }) {
    const imagesRaw = await this.calendarRepository.handle({ calendarExtId });
    const result: Buffer[] = [];

    for (const image of imagesRaw) {
      const month = Month.fromPrimives({
        number: image.calendarMonthNumber,
      }).toPrimitives();
      const buffers = await this.imageLoader.handle({
        imageName: image.fileName,
        templateName: month.name,
      });
      const imageProcessed = await this.generateImage.generate({
        image: buffers.image,
        template: buffers.template,
      });
      result.push(imageProcessed);
    }

    return result.map((calendar) => calendar.toString('base64'));
  }
}
