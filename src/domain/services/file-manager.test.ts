import { mock, mockReset } from "jest-mock-extended";

import { fileManagerService } from "./file-manager";
import { ILearnerblyRepository } from "../repositories/learnerbly";
import {
  CSV_RAW_CONTENT,
  LEARNERBLY_RECORDS,
  FILE_NAME,
  DUMMY_FILE,
} from "../../test/mocks";

describe("Unit: Learnerbly Service", () => {
  const repo = mock<ILearnerblyRepository>();
  const service = fileManagerService(repo);

  beforeEach(() => {
    mockReset(repo);
  });

  test("should parse csv file, save it and return the modelled data", async () => {
    repo.loadFile.mockReturnValue(Promise.resolve(CSV_RAW_CONTENT));

    const data = await service.loadFile(DUMMY_FILE);

    expect(repo.saveToLocalStorage).toHaveBeenCalledWith(
      CSV_RAW_CONTENT,
      FILE_NAME
    );
    expect(data).toEqual(LEARNERBLY_RECORDS);
  });

  test("should filter empty rows", async () => {
    const CSV_WITH_EMPTY_LINE = CSV_RAW_CONTENT + "\n";
    repo.loadFile.mockReturnValue(Promise.resolve(CSV_WITH_EMPTY_LINE));

    const data = await service.loadFile(DUMMY_FILE);

    expect(repo.saveToLocalStorage).toHaveBeenCalledWith(
      CSV_WITH_EMPTY_LINE,
      FILE_NAME
    );
    expect(data).toEqual(LEARNERBLY_RECORDS);
  });

  test("should process a stored file and get its records", () => {
    const records = service.loadStoredFile({
      name: FILE_NAME,
      content: CSV_RAW_CONTENT,
    });
    expect(records).toEqual(LEARNERBLY_RECORDS);
  });
});
