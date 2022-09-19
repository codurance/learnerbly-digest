import hydrateSchema from "hydrate-schema";

import { ILearnerblyRepository } from "../repositories/learnerbly";
import { CSV } from "../../infrastructure/instances/csv-parser";
import { LearnerblyRecord } from "../models/learnerbly-record";
import { pipe } from "@typed/functions";

const parser = CSV();

export const learnerblyService = (repo: ILearnerblyRepository) => ({
  async loadFile(file: File): Promise<LearnerblyRecord[]> {
    const csv = await repo.loadFile(file);
    return this.processRawCSV(csv);
  },

  processRawCSV(csv: string): LearnerblyRecord[] {
    const { rows } = parser.parse(csv);

    return rows.map(
      hydrateSchema({
        id: autoIncrementID(0),
        email: pick("User Email"),
        name: pick("User First Name"),
        surname: pick("User Last Name"),
        currency: pick("Currency"),
        timeFrame: getTimeFrame,
        country: pick("User Geographic Location"),
        budget: pipe(pick("Total Budget Value"), Number),
        spent: pipe(pick("Total Spent"), Number),
      })
    );
  },
});

function autoIncrementID(initialValue: number) {
  return function () {
    const id = initialValue++;
    return String(id);
  };
}

function pick(attr: string) {
  return (record: Record<string, any>) => record[attr];
}

function isDate(date: string): boolean {
  return /"\w+ [0-9]{1,2}, [0-9]{4}"/g.test(date);
}

function getYear(date: string): string {
  return (date.match(/[0-9]{4}/g) || [])[0];
}

function getTimeFrame(record: Record<string, any>) {
  const startDate = (record["Start Date"] as string) || "";
  const endDate = (record["End Date"] as string) || "";
  if (isDate(startDate) && isDate(endDate)) {
    return `${getYear(startDate)}-${getYear(endDate)}`;
  }
}
