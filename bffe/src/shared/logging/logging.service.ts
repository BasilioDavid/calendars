export abstract class LoggingService<
  Resource extends Record<string | number | symbol, unknown> = Record<
    string,
    unknown
  >
> {
  abstract save<Key extends keyof Resource>(
    key: Key,
    value: Resource[Key]
  ): void;
  abstract getOrCreate<Key extends keyof Resource>(
    key: Key,
    defaults: Resource[Key]
  ): Resource[Key];
  abstract getAll(): Resource;
  abstract writeAll(): void;
}
