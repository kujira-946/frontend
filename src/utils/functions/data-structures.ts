export function deepCopy<Arg>(arg: Arg): Arg {
  return JSON.parse(JSON.stringify(arg));
}

export function removeDuplicatesFromArray<Array>(array: Array[]): Array[] {
  return Array.from(new Set(array));
}
