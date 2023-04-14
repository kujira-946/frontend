import * as Constants from "@/utils/constants";

export function generateFormattedDate(
  date: Date,
  withDay: boolean = false
): string {
  const month = Constants.months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  if (withDay) return `${month} ${day}, ${year}`;
  else return `${month} ${year}`;
}

export function getMonthMaxDay(month: number) {
  const maxYear = new Date().getFullYear();
  return new Date(maxYear, month, 0).getDate();
}

export function validateDateError(
  month: number,
  day: number,
  year: number
): string {
  const maxYear = new Date().getFullYear();
  if (month === 0) {
    return "Month must be positive.";
  } else if (!month) {
    return "Month must be a number.";
  } else if (month < 1) {
    return "Month must be positive.";
  } else if (month > 12) {
    return "Month cannot exceed 12.";
  } else if (day === 0) {
    return "Day must be positive.";
  } else if (!day) {
    return "Day must be a number.";
  } else if (day < 1) {
    return "Day must be positive.";
  } else if (day > getMonthMaxDay(day)) {
    return `Day cannot exceed ${getMonthMaxDay(day)}.`;
  } else if (year === 0) {
    return "Year must be positive.";
  } else if (!year) {
    return "Year must be a number.";
  } else if (year.toString().length < 4) {
    return "Year too small.";
  } else if (year > maxYear) {
    return "Year too high.";
  } else {
    return "";
  }
}
