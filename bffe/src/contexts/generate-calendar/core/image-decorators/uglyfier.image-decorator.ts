import { ImageDecorator } from '../../../../shared/image-decorators/image-decorator';
import { createCanvas, loadImage } from 'canvas';

export class UglyfierImageDecorator extends ImageDecorator {
  constructor() {
    super();
  }

  async decorate(image: Buffer): Promise<Buffer> {
    const imageLoaded = await loadImage(image);
    const returnHeight = imageLoaded.height * 0.15;
    const returnWidth = imageLoaded.width * 0.15;

    const canvas = createCanvas(returnWidth, returnHeight);
    const canvasText = createCanvas(returnWidth, returnHeight);
    const ctx = canvas.getContext('2d');
    const ctxText = canvasText.getContext('2d');
    ctxText.font = '25px serif';
    ctxText.fillStyle = 'black';
    ctxText.fillStyle = 'bold';
    ctxText.globalAlpha = 0.5;

    ctx.drawImage(imageLoaded, 0, 0, returnWidth, returnHeight);
    const txtHeight = 65;
    const txt = 'Imagen con propositos informativos              ';
    const offset = 5;
    for (let i = 0; i < Math.ceil(canvas.height / txtHeight); i++) {
      ctxText.fillText(txt, -(i * offset), i * txtHeight);
    }
    // ctx.fillText('Hello world', 10, 50);
    ctx.drawImage(await loadImage(canvasText.toBuffer()), 0, 0);

    return canvas.toBuffer();
  }
}
