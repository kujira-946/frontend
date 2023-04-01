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
