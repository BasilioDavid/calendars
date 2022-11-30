import { ImageDecorator } from '../../../../shared/image-decorators/image-decorator';
import { createCanvas, loadImage } from 'canvas';
import { normalizeShape } from '../../../../shared/image-decorators/utils';

const MAXIMUM_WIDTH = 900;
const MAXIMUM_HEIGHT = 550;

export class MinifierToNormalImageDecorator extends ImageDecorator {
  constructor() {
    super();
  }

  async decorate(image: Buffer): Promise<Buffer> {
    const imageLoaded = await loadImage(image);
    const { width: normalizedWidth, height: normalizedHeight } = normalizeShape(
      {
        height: imageLoaded.height,
        width: imageLoaded.width,
        maximumHeight: MAXIMUM_HEIGHT,
        maximumWidth: MAXIMUM_WIDTH,
      }
    );

    const canvas = createCanvas(normalizedWidth, normalizedHeight);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(imageLoaded, 0, 0, normalizedWidth, normalizedHeight);

    return canvas.toBuffer();
  }
}
