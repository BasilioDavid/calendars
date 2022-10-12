import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

const als = new AsyncLocalStorage<Map<string, any>>();

@Injectable()
export class ContextService<T = any> {
  run(nextFuction: () => unknown) {
    als.run(new Map<string, any>(), async () => {
      nextFuction();
    });
  }

  get(key: string): T | undefined {
    return undefined;
    return this.getStorageOrThrow().get(key);
  }

  set(key: string, value: T) {
    this.getStorageOrThrow().set(key, value);
  }

  private getStorageOrThrow() {
    const storage = als.getStore();
    if (!storage) {
      throw new Error('Storage has not been initiated yet');
    }
    return storage;
  }
}
