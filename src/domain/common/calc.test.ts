import {
  calculatePercentage,
  getRecordTimeFrame,
  getYearFromRecordDate,
} from "./calc";

describe("UNIT: calculation utilities", () => {
  test("calculatePercentage should return the relation between two numbers in % with precision 4", () => {
    expect(calculatePercentage(1, 2)).toBe(50);
    expect(calculatePercentage(3, 4)).toBe(75);
    expect(calculatePercentage(1, 3)).toBe(33.33);
  });

  test("getYearFromRecordDate should extract the year from the csv field", () => {
    expect(getYearFromRecordDate('"Jan 31, 2022"')).toBe("2022");
    expect(getYearFromRecordDate('"Aug 2, 1995"')).toBe("1995");
  });

  test("getRecordTimeFrame should get the start and end years and use the format <start-year>-<end-year>", () => {
    const record = {
      "Start Date": '"Jan 1, 2021"',
      "End Date": '"Jan 2, 2022"',
    };
    expect(getRecordTimeFrame(record)).toBe("2021-2022");
  });
});
