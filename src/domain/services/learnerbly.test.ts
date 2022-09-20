import { mock, mockReset } from "jest-mock-extended";
import { CSV_RAW_CONTENT, CSV_ROWS } from "../../test/mocks";

import { ILearnerblyRepository } from "../repositories/learnerbly";
import { learnerblyService } from "./learnerbly";

const FILE = new File(["content"], "mock.csv", { type: "csv" });
describe("Unit: Learnerbly Service", () => {
  const repo = mock<ILearnerblyRepository>();
  const service = learnerblyService(repo);

  beforeEach(() => {
    mockReset(repo);
  });

  test("should parse csv file and return the modelled data", async () => {
    repo.loadFile.mockReturnValue(Promise.resolve(CSV_RAW_CONTENT));

    const data = await service.loadFile(FILE);

    expect(data).toEqual(CSV_ROWS);
  });

  test("should filter empty rows", async () => {
    const CSV_WITH_EMPTY_LINE = CSV_RAW_CONTENT + "\n";
    repo.loadFile.mockReturnValue(Promise.resolve(CSV_WITH_EMPTY_LINE));

    const data = await service.loadFile(FILE);

    expect(data).toEqual(CSV_ROWS);
  });
});
