export function invariant(message: string, condition: boolean) {
  if (!condition) throw new Error(message); //TODO: change error
}
