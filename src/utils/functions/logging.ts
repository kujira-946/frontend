export function consoleLog(value: any, logWithValue = true): void {
  if (logWithValue) console.log(`${value}:`, value);
  else console.log(`${value}`);
}
