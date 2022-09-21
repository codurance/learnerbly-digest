import hydrateSchema from "hydrate-schema";
import { pipe } from "@typed/functions";

import { LearnerblyRecord } from "../models/learnerbly-record";
import { ILearnerblyRepository } from "../repositories/learnerbly";
import { CSV } from "../../infrastructure/instances/csv-parser";
import { calculatePercentage, getRecordTimeFrame } from "../common/calc";
import config from "../common/config";

const parser = CSV();

export const learnerblyService = (repo: ILearnerblyRepository) => ({
  async loadFile(file: File): Promise<LearnerblyRecord[]> {
    const csv = await repo.loadFile(file);
    return this.processRawCSV(csv);
  },

  processRawCSV(csv: string): LearnerblyRecord[] {
    const { rows } = parser.parse(csv);

    return rows.filter(filterEmptyRows).map(learnerblyRecordFromCSVRow());
  },
});

const filterEmptyRows = (row: any) => row[config.CSV_COLUMNS.EMAIL] != null;

const learnerblyRecordFromCSVRow = () =>
  pipe(
    hydrateSchema({
      id: autoIncrementID(0),
      email: pick(config.CSV_COLUMNS.EMAIL),
      name: pick(config.CSV_COLUMNS.NAME),
      surname: pick(config.CSV_COLUMNS.SURNAME),
      currency: pick(config.CSV_COLUMNS.CURRENCY),
      timeFrame: getRecordTimeFrame,
      country: pick(config.CSV_COLUMNS.COUNTRY),
      budget: pipe(pick(config.CSV_COLUMNS.BUDGET), Number),
      spent: pipe(pick(config.CSV_COLUMNS.SPENT), Number),
    }),
    addFields<LearnerblyRecord>((row) => ({
      budgetUsage: calculatePercentage(row.spent, row.budget),
    }))
  );

function autoIncrementID(initialValue: number) {
  return function () {
    const id = initialValue++;
    return String(id);
  };
}

function pick(attr: string) {
  return (record: Record<string, any>) => record[attr];
}

function addFields<T>(fn: (base: Partial<T>) => Partial<T>) {
  return (base: Partial<T>): T => {
    return {
      ...base,
      ...fn(base),
    } as T;
  };
}
