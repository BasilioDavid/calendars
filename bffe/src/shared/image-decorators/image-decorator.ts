export abstract class ImageDecorator {
  abstract decorate(image: Buffer): Buffer | Promise<Buffer>;
}
