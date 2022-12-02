import { Injectable } from '@nestjs/common';
import { Part } from '../../../shared/building-blocks/part.value-object';
import { ImageDecorator } from '../../../shared/image-decorators/image-decorator';
import { UserService } from '../../../shared/user/user.service';
import { CoverImageDecorator } from '../core/image-decorators/cover.image-decorator';
import { MinifierImageDecorator } from '../core/image-decorators/minifier.image-decorator';
import { MonthImageDecorator } from '../core/image-decorators/month.image-decorator';
import { GetCalendarImagesNameRepository } from '../core/repositories/get-calendar-images-name.repository';
import { ImageLoaderRepository } from '../core/repositories/image-loader.repository';

@Injectable()
export class GenerateCalendarService {
  private partFactory: { [K: number]: ImageDecorator } = {
    0: new MonthImageDecorator(1),
    1: new MonthImageDecorator(2),
    2: new MonthImageDecorator(3),
    3: new MonthImageDecorator(4),
    4: new MonthImageDecorator(5),
    5: new MonthImageDecorator(6),
    6: new MonthImageDecorator(7),
    7: new MonthImageDecorator(8),
    8: new MonthImageDecorator(9),
    9: new MonthImageDecorator(10),
    10: new MonthImageDecorator(11),
    11: new MonthImageDecorator(12),
  };
  constructor(
    private readonly calendarRepository: GetCalendarImagesNameRepository,
    private readonly imageLoader: ImageLoaderRepository,
    private readonly userService: UserService
  ) {}

  async generate({ calendarExtId }: { calendarExtId: string }) {
    const imagesRaw = await this.calendarRepository.handle({
      calendarExtId,
      userId: this.userService.get().id,
    });
    const result: Buffer[] = [];

    const minifier = new MinifierImageDecorator();
    for (const image of imagesRaw) {
      const part = Part.fromPrimives({
        number: image.calendarMonthNumber,
      }).toPrimitives();
      const buffers = await this.imageLoader.handle({
        imageName: image.fileName,
      });
      const imageProcessed = await this.partFactory[part.number].decorate(
        buffers.image
      );
      const imageMinified = await minifier.decorate(imageProcessed);
      result.push(imageMinified);
    }

    return result.map((calendar) => calendar.toString('base64'));
  }
}
