import { mock, mockReset } from "jest-mock-extended";
import { ILocalStorage } from "../../domain/repositories/local-storage";
import {
  CSV_RAW_CONTENT,
  DUMMY_FILE,
  FILE_NAME,
  STORED_FILE,
} from "../../test/mocks";
import { fileReader } from "../instances/file-reader";
import { localStorage } from "../instances/local-storage";
import { browser, LEARNERBLY_DIGEST_STORAGE } from "./browser";

describe("UNIT: browser", () => {
  test("should load file to a promised string", async () => {
    const fileReader: any = {
      readAsText: function () {
        this?.onload({
          target: { result: CSV_RAW_CONTENT },
        });
      },
    };
    const browserManager = browser(fileReader, localStorage());

    const content = await browserManager.loadFile(DUMMY_FILE);

    expect(content).toEqual(CSV_RAW_CONTENT);
  });

  describe("Save to local storage", () => {
    const reader = fileReader();
    const localStorage = mock<ILocalStorage>();
    const browserManager = browser(reader, localStorage);

    beforeEach(() => {
      mockReset(localStorage);
    });

    test("should store a loaded csv in the local storage with a name", () => {
      localStorage.getItem.mockReturnValue(JSON.stringify({}));

      browserManager.saveToLocalStorage(CSV_RAW_CONTENT, FILE_NAME);

      expect(localStorage.getItem).toHaveBeenCalledWith(
        LEARNERBLY_DIGEST_STORAGE
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        LEARNERBLY_DIGEST_STORAGE,
        STORED_FILE
      );
    });

    test("should create the structure in the local storage if there is nothing saved yet", () => {
      localStorage.getItem.mockReturnValue(null);

      browserManager.saveToLocalStorage(CSV_RAW_CONTENT, FILE_NAME);

      expect(localStorage.getItem).toHaveBeenCalledWith(
        LEARNERBLY_DIGEST_STORAGE
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        LEARNERBLY_DIGEST_STORAGE,
        STORED_FILE
      );
    });
  });
});
