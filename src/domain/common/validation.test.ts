import { isDate } from "./validation";

describe("UNIT: validation", () => {
  test("isDate should identify learnerbly record dates", () => {
    expect(isDate(new Date().toString())).toBe(false);
    expect(isDate('"Jan 1, 2022"')).toBe(true);
  });
});
