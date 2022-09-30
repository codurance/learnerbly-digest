import hydrateSchema from "hydrate-schema";
import { pipe, map, pluck, sort } from "rambda";

import { columnAverage, getFieldUniqueValues } from "../common/calc";
import { xprod } from "../common/functional";
import { LearnerblyRecord } from "../models/learnerbly-record";
import {
  Partition,
  Segment,
  SegmentedStat,
  StatFn,
  LearnerblyStats,
} from "../models/stats";

export const INVALID_PARTITIONS = "Invalid number of partitions";

export const learnerblyStatsService = () => ({
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

  calculateStats(records: LearnerblyRecord[]): LearnerblyStats {
    const averageSpent = columnAverage("spent");
    const averageBudgetUsage = columnAverage("budgetUsage");
    const partitions = createPartitions(records, ["country", "timeFrame"]);
    const spent = this.calculateStatsForPartitions(
      averageSpent,
      partitions,
      records
    );
    const budgetUsage = this.calculateStatsForPartitions(
      averageBudgetUsage,
      partitions,
      records
    );

    return {
      spent: { partitions, stats: spent },
      budgetUsage: { partitions, stats: budgetUsage },
    };
  },
});

function createPartitions(records: LearnerblyRecord[], fields: string[]) {
  const partitionSchema = hydrateSchema({
    property: (field: string) => field,
    segments: pipe(
      getFieldUniqueValues(records),
      sort((a: string, b: string) => (a < b ? -1 : 1))
    ),
  });

  return map(partitionSchema, fields) as Partition[];
}

function getSegmentsFromPartitions(partitions: Partition[]) {
  const partitionsSegments = pluck("segments", partitions);
  return partitions.length === 1
    ? partitionsSegments[0].map((_) => [_])
    : xprod(partitionsSegments[0], partitionsSegments[1]);
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
