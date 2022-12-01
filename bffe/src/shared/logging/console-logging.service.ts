import { Injectable } from '@nestjs/common';
import { ContextService } from '../context/context.service';
import { LoggingService } from './logging.service';

const slog = Symbol('Log key');

@Injectable()
export class ConsoleLoggingService<
  Resources extends Record<string, unknown>
> extends LoggingService<Resources> {
  constructor(
    private readonly context: ContextService<{
      [slog]: Map<string, unknown>;
    }>
  ) {
    super();
  }
  save<Key extends keyof Resources>(key: Key, value: Resources[Key]): void {
    // as string because key dosent infer Resources<T,unknown>
    this.getOrCreateContext().set(key as string, value);
  }

  writeAll(): void {
    console.log(this.getOrCreateContext());
  }

  getAll(): Resources {
    return Object.fromEntries(this.getOrCreateContext().entries()) as Resources;
  }

  getOrCreate<Key extends keyof Resources>(
    key: Key,
    defaults: Resources[Key]
  ): Resources[Key] {
    if (this.getOrCreateContext().has(key as string)) {
      return this.getOrCreateContext().get(key as string) as Resources[Key];
    }
    this.getOrCreateContext().set(key as string, defaults);
    return defaults;
  }

  private getOrCreateContext() {
    return this.context.getOrCreate(slog, new Map<string, string>());
  }
}
