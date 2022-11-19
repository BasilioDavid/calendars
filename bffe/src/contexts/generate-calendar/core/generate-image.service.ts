import { Injectable } from '@nestjs/common';
import { createCanvas, loadImage } from 'canvas';

const X_MARGIN = 100;
const Y_MARGIN = 250;
const MAXIMUM_WIDTH = 1200;
const MAXIMUM_HEIGHT = 900;

@Injectable()
export class GenerateImageService {
  async generate({
    image,
    template,
  }: {
    image: Buffer;
    template: Buffer;
  }): Promise<Buffer> {
    const canvas = createCanvas(2480, 1748);
    const ctx = canvas.getContext('2d');

    const imageTemplate = await loadImage(template);
    const imageToAdd = await loadImage(image);

    ctx.drawImage(imageTemplate, 0, 0);
    // TODO: add some shadow?
    const imgDimensions = this.normalizeShape({
      width: imageToAdd.width,
      height: imageToAdd.height,
    });
    const imgMargins = this.centerInSpace({
      space: { height: MAXIMUM_HEIGHT, width: MAXIMUM_WIDTH },
      image: { height: imgDimensions.height, width: imgDimensions.width },
    });
    ctx.drawImage(
      imageToAdd,
      X_MARGIN + imgMargins.x,
      Y_MARGIN + imgMargins.y,
      imgDimensions.width,
      imgDimensions.height
    );

    ctx.fillText('Preview Img', 0, 0);

    return canvas.toBuffer();
  }

  private normalizeShape({
    height,
    width,
  }: {
    width: number;
    height: number;
  }): {
    width: number;
    height: number;
  } {
    if (width > height) {
      return { width: MAXIMUM_WIDTH, height: MAXIMUM_WIDTH * (height / width) };
    }
    return { height: MAXIMUM_HEIGHT, width: MAXIMUM_HEIGHT * (width / height) };
  }

  private centerInSpace({
    image,
    space,
  }: {
    space: { width: number; height: number };
    image: { width: number; height: number };
  }): { x: number; y: number } {
    return {
      x: (space.width - image.width) / 2,
      y: (space.height - image.height) / 2,
    };
  }
}
