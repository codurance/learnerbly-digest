import { INVALID_PARTITIONS, learnerblyStatsService } from "./learnerbly-stats";
import { columnAverage } from "../common/calc";
import {
  LEARNERBLY_RECORDS,
  PARTITIONS,
  SPENT_STATS,
  LEARNERBLY_STATS,
} from "../../test/mocks";

describe("Unit: Learnerbly Service", () => {
  const service = learnerblyStatsService();

  test("should calculate stat for every segment in a partition", () => {
    const data = LEARNERBLY_RECORDS;

    const statFn = columnAverage("spent");
    const partitions = PARTITIONS.slice(0, 1);
    const stats = service.calculateStatsForPartitions(statFn, partitions, data);

    expect(stats).toEqual([
      { segment: ["ES"], value: 175 },
      { segment: ["GB"], value: 125 },
    ]);
  });

  test("should calculate stat for every pair of segments in a 2d space of partitions", () => {
    const data = LEARNERBLY_RECORDS;

    const statFn = columnAverage("spent");
    const stats = service.calculateStatsForPartitions(statFn, PARTITIONS, data);

    expect(stats).toEqual(SPENT_STATS);
  });

  test("should not allow a partition number bigger than 2", () => {
    const partitions = [
      { property: "country", segments: [] },
      { property: "timeFrame", segments: [] },
      { property: "other", segments: [] },
    ];
    const statFn = columnAverage("spent");

    expect(() =>
      service.calculateStatsForPartitions(statFn, partitions, [])
    ).toThrowError(INVALID_PARTITIONS);
  });

  test("should calculate all the domain-interesting partition stats", () => {
    expect(service.calculateStats(LEARNERBLY_RECORDS)).toEqual(
      LEARNERBLY_STATS
    );
  });
});
