import { curry, pluck, uniq } from "rambda";

import config from "./config";
import { isDate } from "./validation";

export function calculatePercentage(a: number = 0, b: number = 0): number {
  if (a === 0 && b === 0) {
    return 0;
  }
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

export const getFieldUniqueValues = curry(
  (records: Record<string, any>[], field: string) => {
    return uniq(pluck(field, records));
  }
);

export function columnAverage(field: string) {
  return (records: Record<string, any>[]) =>
    records.reduce((acc, row) => acc + row[field], 0) / records.length;
}

export function xprod(arr1: any[], arr2: any[]): any[][] {
  return arr1
    .map((element1) => {
      return arr2.map((element2) => {
        return [element1, element2];
      });
    })
    .flat();
}
