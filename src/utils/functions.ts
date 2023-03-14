export function checkIsLetter(word: string): boolean {
  for (let index = 0; index < word.length; index++) {
    const character = word[index];
    if (!character.match(/[a-z]/i)) {
      return false;
    }
  }
  return true;
}

export function debounce(callback: Function, delay: number = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function <This, Argument>(this: This, ...args: Argument[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

export function sagaResponseError(error: any): string {
  return error.response.data.body;
}
