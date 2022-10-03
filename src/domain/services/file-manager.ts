import hydrateSchema from "hydrate-schema";
import { pipe, prop } from "rambda";

import { LearnerblyRecord } from "../models/learnerbly-record";
import { ILearnerblyRepository } from "../repositories/learnerbly";
import { CSV } from "../../infrastructure/instances/csv-parser";
import { calculatePercentage, getRecordTimeFrame } from "../common/calc";
import config from "../common/config";

const parser = CSV();

export const fileManagerService = (repo: ILearnerblyRepository) => ({
  async loadFile(file: File): Promise<LearnerblyRecord[]> {
    const csv = await repo.loadFile(file);
    repo.saveToLocalStorage(csv, file.name);
    return this.processRawCSV(csv);
  },

  processRawCSV(csv: string): LearnerblyRecord[] {
    const { rows } = parser.parse(csv);

    return rows.filter(filterEmptyRows).map(learnerblyRecordFromCSVRow);
  },
});

const filterEmptyRows = (row: any) => row[config.CSV_COLUMNS.EMAIL] != null;

const learnerblyRecordFromCSVRow = (line: string, id: number) =>
  pipe(
    hydrateSchema({
      id: String(id),
      email: prop(config.CSV_COLUMNS.EMAIL),
      name: prop(config.CSV_COLUMNS.NAME),
      surname: prop(config.CSV_COLUMNS.SURNAME),
      currency: prop(config.CSV_COLUMNS.CURRENCY),
      timeFrame: getRecordTimeFrame,
      country: prop(config.CSV_COLUMNS.COUNTRY),
      budget: pipe(prop(config.CSV_COLUMNS.BUDGET), Number),
      spent: pipe(prop(config.CSV_COLUMNS.SPENT), Number),
    }),
    addFields<LearnerblyRecord>((row) => ({
      budgetUsage: calculatePercentage(row.spent, row.budget),
    }))
  )(line);

function addFields<T>(fn: (base: Partial<T>) => Partial<T>) {
  return (base: Partial<T>): T => {
    return {
      ...base,
      ...fn(base),
    } as T;
  };
}
