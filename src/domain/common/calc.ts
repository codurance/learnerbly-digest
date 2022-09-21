import config from "./config";
import { isDate } from "./validation";

export function calculatePercentage(a: number = 0, b: number = 0): number {
  return Number(((a / b) * 100).toFixed(2));
}

export function getYearFromRecordDate(date: string): string {
  return (date.match(/[0-9]{4}/g) || [])[0];
}

export function getRecordTimeFrame(record: Record<string, any>) {
  const startDate = (record[config.CSV_COLUMNS.START_DATE] as string) || "";
  const endDate = (record[config.CSV_COLUMNS.END_DATE] as string) || "";
  if (isDate(startDate) && isDate(endDate)) {
    return `${getYearFromRecordDate(startDate)}-${getYearFromRecordDate(
      endDate
    )}`;
  }
}
