export abstract class Repositoy<In, Out> {
  abstract handle(data: In): Promise<Out>;
}
