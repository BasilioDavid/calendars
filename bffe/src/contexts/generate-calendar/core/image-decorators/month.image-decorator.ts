import { ImageDecorator } from '../../../../shared/image-decorators/image-decorator';
import { createCanvas, loadImage } from 'canvas';
import { UTIL_FOLDER } from '../../../../shared/consts';
import { readFile } from 'fs/promises';
import {
  centerInSpace,
  normalizeShape,
} from '../../../../shared/image-decorators/utils';

const X_MARGIN = 100;
const Y_MARGIN = 250;
const MAXIMUM_WIDTH = 1200;
const MAXIMUM_HEIGHT = 900;

const monthNumberToFileName = {
  1: 'January.png',
  2: 'Febrary.png',
  3: 'March.png',
  4: 'April.png',
  5: 'May.png',
  6: 'June.png',
  7: 'July.png',
  8: 'August.png',
  9: 'September.png',
  10: 'October.png',
  11: 'November.png',
  12: 'December.png',
};

export class MonthImageDecorator extends ImageDecorator {
  constructor(private readonly monthNumber: number) {
    super();
  }

  async decorate(image: Buffer): Promise<Buffer> {
    const canvas = createCanvas(2480, 1748);
    const ctx = canvas.getContext('2d');

    const template = await readFile(
      `${UTIL_FOLDER.TEMPLATES}/${monthNumberToFileName[this.monthNumber]}`
    );

    const imageLoaded = await loadImage(image);
    const templateLoaded = await loadImage(template);

    ctx.drawImage(templateLoaded, 0, 0);

    const imgDimensions = normalizeShape({
      width: imageLoaded.width,
      height: imageLoaded.height,
      maximumHeight: MAXIMUM_HEIGHT,
      maximumWidth: MAXIMUM_WIDTH,
    });
    const imgMargins = centerInSpace({
      space: { height: MAXIMUM_HEIGHT, width: MAXIMUM_WIDTH },
      image: { height: imgDimensions.height, width: imgDimensions.width },
    });

    ctx.drawImage(
      imageLoaded,
      X_MARGIN + imgMargins.x,
      Y_MARGIN + imgMargins.y,
      imgDimensions.width,
      imgDimensions.height
    );
    return canvas.toBuffer();
  }
}
