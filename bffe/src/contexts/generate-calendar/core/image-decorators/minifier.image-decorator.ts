import { ImageDecorator } from '../../../../shared/image-decorators/image-decorator';
import { createCanvas, loadImage } from 'canvas';

export class MinifierImageDecorator extends ImageDecorator {
  constructor() {
    super();
  }

  async decorate(image: Buffer): Promise<Buffer> {
    const imageLoaded = await loadImage(image);
    const returnHeight = imageLoaded.height * 0.15;
    const returnWidth = imageLoaded.width * 0.15;

    const canvas = createCanvas(returnWidth, returnHeight);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(imageLoaded, 0, 0, returnWidth, returnHeight);

    return canvas.toBuffer();
  }
}
