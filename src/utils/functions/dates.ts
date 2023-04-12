import * as Constants from "@/utils/constants";

export function generateFormattedDate(date?: Date): string {
  const month = date
    ? Constants.months[date.getMonth()]
    : Constants.months[new Date().getMonth()];
  const year = date ? date.getFullYear() : new Date().getFullYear();
  return `${month} ${year}`;
}
