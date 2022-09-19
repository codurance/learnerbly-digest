import { CSV } from "./csv-parser";

describe("UNIT: CSV Parser", () => {
  test("should parse a CSV contained in a string", () => {
    const parser = CSV();
    const csv = 'foo,bar\n3,"some, thing"';

    const { header, rows } = parser.parse(csv);

    expect(header).toEqual(["foo", "bar"]);
    expect(rows).toEqual([{ foo: "3", bar: '"some, thing"' }]);
  });
});
