import { mock, mockReset } from "jest-mock-extended";
import { CSV_RAW_CONTENT, LEARNERBLY_RECORDS } from "../../test/mocks";
import { columnAverage, getFieldUniqueValues } from "../common/calc";
import { LearnerblyRecord } from "../models/learnerbly-record";

import { ILearnerblyRepository } from "../repositories/learnerbly";
import { INVALID_PARTITIONS, learnerblyService } from "./learnerbly";

const FILE = new File(["content"], "mock.csv", { type: "csv" });
const DATA_WITH_PARTITIONS = [
  { spent: 3, country: "ES", timeFrame: "2021-2022" },
  { spent: 4, country: "PT", timeFrame: "2021-2022" },
  { spent: 5, country: "PT", timeFrame: "2022-2023" },
  { spent: 2, country: "ES", timeFrame: "2022-2023" },
];

describe("Unit: Learnerbly Service", () => {
  const repo = mock<ILearnerblyRepository>();
  const service = learnerblyService(repo);

  beforeEach(() => {
    mockReset(repo);
  });

  test("should parse csv file and return the modelled data", async () => {
    repo.loadFile.mockReturnValue(Promise.resolve(CSV_RAW_CONTENT));

    const data = await service.loadFile(FILE);

    expect(data).toEqual(LEARNERBLY_RECORDS);
  });

  test("should filter empty rows", async () => {
    const CSV_WITH_EMPTY_LINE = CSV_RAW_CONTENT + "\n";
    repo.loadFile.mockReturnValue(Promise.resolve(CSV_WITH_EMPTY_LINE));

    const data = await service.loadFile(FILE);

    expect(data).toEqual(LEARNERBLY_RECORDS);
  });

  test("should calculate stat for every segment in a partition", () => {
    const data = DATA_WITH_PARTITIONS;

    const statFn = columnAverage("spent");
    const partitions = [
      {
        property: "country",
        segments: getFieldUniqueValues(data)("country"),
      },
    ];
    const stats = service.calculateStatsForPartitions(statFn, partitions, data);

    expect(stats).toEqual([
      { segment: ["ES"], value: 2.5 },
      { segment: ["PT"], value: 4.5 },
    ]);
  });

  test("should calculate stat for every pair of segments in a 2d space of partitions", () => {
    const data = DATA_WITH_PARTITIONS;

    const statFn = columnAverage("spent");
    const countries = getFieldUniqueValues(data)("country");
    const timeFrames = getFieldUniqueValues(data)("timeFrame");
    const partitions = [
      { property: "country", segments: countries },
      { property: "timeFrame", segments: timeFrames },
    ];
    const stats = service.calculateStatsForPartitions(statFn, partitions, data);

    expect(stats).toEqual([
      { segment: ["ES", "2021-2022"], value: 3 },
      { segment: ["ES", "2022-2023"], value: 2 },
      { segment: ["PT", "2021-2022"], value: 4 },
      { segment: ["PT", "2022-2023"], value: 5 },
    ]);
  });

  test("should not allow a partition number bigger than 2", () => {
    const partitions = [
      { property: "country", segments: [] },
      { property: "timeFrame", segments: [] },
      { property: "other", segments: [] },
    ];
    expect(() =>
      service.calculateStatsForPartitions((_) => 1, partitions, [])
    ).toThrowError(INVALID_PARTITIONS);
  });

  test("should calculate stats", () => {
    const data = DATA_WITH_PARTITIONS;
    expect(service.calculateStats(data as LearnerblyRecord[])).toEqual([
      { segment: ["ES", "2021-2022"], value: 3 },
      { segment: ["ES", "2022-2023"], value: 2 },
      { segment: ["PT", "2021-2022"], value: 4 },
      { segment: ["PT", "2022-2023"], value: 5 },
    ]);
  });
});
