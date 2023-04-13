export function debounce(callback: Function, delay: number = 500) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function <This, Argument>(this: This, ...args: Argument[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
