export function checkValidCharacters(word: string): boolean {
  for (let index = 0; index < word.length; index++) {
    const character = word[index];
    if (!character.match(/^[a-zA-Z0-9_\-]+$/)) {
      return false;
    }
  }
  return true;
}

export function roundNumber(number: number, places: number): string {
  const roundedNumber = number.toFixed(places);
  if (!roundedNumber.includes(".")) return roundedNumber + ".00";
  else return roundedNumber;
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
