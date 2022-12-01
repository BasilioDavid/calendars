import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

const als = new AsyncLocalStorage<Map<any, any>>();

@Injectable()
export class ContextService<
  Resources extends Record<string | number | symbol, unknown> = Record<
    any,
    unknown
  >
> {
  run(nextFuction: () => unknown) {
    als.run(new Map<any, any>(), async () => {
      nextFuction();
    });
  }

  get<Key extends keyof Resources>(key: Key): Resources[Key] | undefined {
    return this.getStorageOrThrow().get(key);
  }

  getOrCreate<Key extends keyof Resources>(
    key: Key,
    defaults: Resources[Key]
  ): Resources[Key] {
    if (this.getStorageOrThrow().has(key)) {
      return this.getStorageOrThrow().get(key);
    }
    this.getStorageOrThrow().set(key, defaults);
    return defaults;
  }

  set<Key extends keyof Resources>(key: Key, value: Resources[Key]): void {
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
