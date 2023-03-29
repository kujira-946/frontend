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

export function formattedNumber(number: number): string {
  const roundedNumber = roundNumber(number, 2);
  const numberToFormat = roundedNumber.slice(0, roundedNumber.length - 3);
  const roundedDecimals = roundedNumber.slice(roundedNumber.length - 3);
  const formattedNumber = Number(numberToFormat).toLocaleString("en-US");
  return formattedNumber + roundedDecimals;
}

export function deepCopy<Arg>(arg: Arg): Arg {
  return JSON.parse(JSON.stringify(arg));
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
