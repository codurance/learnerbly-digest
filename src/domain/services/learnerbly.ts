import hydrateSchema from "hydrate-schema";
import { pipe, prop, pluck, map } from "rambda";

import { LearnerblyRecord } from "../models/learnerbly-record";
import { Partition, Segment, SegmentedStat, StatFn } from "../models/stats";
import { ILearnerblyRepository } from "../repositories/learnerbly";
import { CSV } from "../../infrastructure/instances/csv-parser";
import {
  calculatePercentage,
  columnAverage,
  getFieldUniqueValues,
  getRecordTimeFrame,
  xprod,
} from "../common/calc";
import config from "../common/config";

export const INVALID_PARTITIONS = "Invalid number of partitions";

const parser = CSV();

export const learnerblyService = (repo: ILearnerblyRepository) => ({
  async loadFile(file: File): Promise<LearnerblyRecord[]> {
    const csv = await repo.loadFile(file);
    return this.processRawCSV(csv);
  },

  processRawCSV(csv: string): LearnerblyRecord[] {
    const { rows } = parser.parse(csv);

    return rows.filter(filterEmptyRows).map(learnerblyRecordFromCSVRow);
  },

  calculateStatsForPartitions(
    statFn: StatFn,
    partitions: Partition[],
    records: Record<string, any>[]
  ): SegmentedStat[] {
    if (partitions.length < 1 || partitions.length > 2)
      throw new Error(INVALID_PARTITIONS);

    const properties = pluck("property", partitions);
    const segments = getSegmentsFromPartitions(partitions);
    return segments.map(calculateStatForSegment(statFn, properties, records));
  },

  calculateStats(records: LearnerblyRecord[]): SegmentedStat[] {
    const statFn = columnAverage("spent");
    const partitions = createPartitions(records, ["country", "timeFrame"]);
    return this.calculateStatsForPartitions(statFn, partitions, records);
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

function createPartitions(records: LearnerblyRecord[], fields: string[]) {
  const partitionSchema = hydrateSchema({
    property: (field: string) => field,
    segments: getFieldUniqueValues(records),
  });
  return map(partitionSchema, fields) as Partition[];
}

function getSegmentsFromPartitions(partitions: Partition[]) {
  const partitionsSegments = pluck("segments", partitions);
  const segments =
    partitions.length === 1
      ? partitionsSegments[0].map((_) => [_])
      : xprod(partitionsSegments[0], partitionsSegments[1]);
  return segments;
}

function calculateStatForSegment(
  statFn: StatFn,
  properties: string[],
  records: Record<string, any>[]
) {
  return (segment: Segment): SegmentedStat => {
    const group = filterRecordsBySegment(properties, segment, records);
    return {
      segment: segment,
      value: statFn(group),
    };
  };
}

function filterRecordsBySegment(
  properties: string[],
  segment: Segment,
  records: Record<string, any>[]
) {
  return records.filter((record) =>
    properties.reduce(
      (acc, property, i) => acc && record[property] === segment[i],
      true
    )
  );
}

function addFields<T>(fn: (base: Partial<T>) => Partial<T>) {
  return (base: Partial<T>): T => {
    return {
      ...base,
      ...fn(base),
    } as T;
  };
}
