import { mock, mockReset } from "jest-mock-extended";
import { CSV_RAW_CONTENT, CSV_ROWS } from "../../test/mocks";

import { ILearnerblyRepository } from "../repositories/learnerbly";
import { learnerblyService } from "./learnerbly";

describe("Unit: Learnerbly Service", () => {
  const repo = mock<ILearnerblyRepository>();
  const service = learnerblyService(repo);

  beforeEach(() => {
    mockReset(repo);
  });

  test("should parse csv file and return the modelled data", async () => {
    const file = new File(["content"], "mock.csv", { type: "csv" });
    repo.loadFile.mockReturnValue(Promise.resolve(CSV_RAW_CONTENT));

    const data = await service.loadFile(file);

    expect(data).toEqual(CSV_ROWS);
  });
});
