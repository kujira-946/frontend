import * as Constants from "@/utils/constants";

export function generateFormattedDate(
  date: Date,
  withDay: boolean = false
): string {
  const month = Constants.months[date.getMonth()];
  const day = date.getDay();
  const year = date.getFullYear();

  if (withDay) return `${month} ${day} ${year}`;
  else return `${month} ${year}`;
}
