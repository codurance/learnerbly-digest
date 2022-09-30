import { LearnerblyRecord } from "../models/learnerbly-record";
import {
  calculatePercentage,
  columnAverage,
  getFieldUniqueValues,
  getRecordTimeFrame,
  getYearFromRecordDate,
} from "./calc";

describe("UNIT: calculation utilities", () => {
  test("calculatePercentage should return the relation between two numbers in % with precision 4", () => {
    expect(calculatePercentage(1, 2)).toBe(50);
    expect(calculatePercentage(3, 4)).toBe(75);
    expect(calculatePercentage(1, 3)).toBe(33.33);
    expect(calculatePercentage(0, 0)).toBe(0);
    expect(calculatePercentage(1, 0)).toBe(Infinity);
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

  test("columnAverage should calculate the average of a field in a record list", () => {
    const records = [{ spent: 1 }, { spent: 2 }];
    expect(columnAverage("spent")(records as LearnerblyRecord[])).toBe(1.5);
  });

  test("getFieldUniqueValues should return an arry with all the unique values of a record list's column", () => {
    const records = [{ country: "ES" }, { country: "GB" }, { country: "ES" }];
    expect(getFieldUniqueValues(records, "country")).toEqual(["ES", "GB"]);
  });
});
