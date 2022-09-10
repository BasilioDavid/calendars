import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

const als = new AsyncLocalStorage<Map<string, any>>();

@Injectable()
export class QueryContextService {
  run(nextFuction: () => unknown) {
    als.run(new Map<string, any>(), async () => {
      nextFuction();
    });
  }

  get(key: string) {
    return this.getStorageOrThrow().get(key);
  }

  set(key: string, value: any) {
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
