import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mock, MockProxy, mockReset } from "jest-mock-extended";

import { ILocalStorage } from "../../../../domain/repositories/local-storage";
import { LEARNERBLY_DIGEST_STORAGE } from "../../../repositories/browser";
import { localStorage } from "../../../instances/local-storage";
import { DataTable } from "../../components/DataTable/DataTable";
import App from "./App";
import {
  DUMMY_FILE,
  FILE_NAME,
  LEARNERBLY_RECORDS,
  STORED_FILE,
} from "../../../../test/mocks";
import { LearnerblyRecord } from "../../../../domain/models/learnerbly-record";

mockFileReader();
jest.mock("../../components/DataTable/DataTable.tsx");
jest.mock("../../../instances/local-storage.ts", () => {
  const localStorage = mock<ILocalStorage>();
  return {
    localStorage: () => localStorage,
  };
});

describe("ACCEPTANCE: App", () => {
  test("when a file is uploaded its contents should be sent to the DataTable", async () => {
    const storage = renderWithData(JSON.stringify({}));

    const input = screen.getByTestId("FileInput-hidden-input");
    fireEvent.change(input, {
      target: {
        files: [DUMMY_FILE],
      },
    });

    await waitForRecordsToBeShownInTable(LEARNERBLY_RECORDS);

    expect(storage.setItem).toHaveBeenCalledWith(
      LEARNERBLY_DIGEST_STORAGE,
      STORED_FILE
    );
  });

  test("should show old files when loading if they exist", () => {
    renderWithData(STORED_FILE);

    expect(screen.getByText(FILE_NAME)).toBeVisible();
  });

  test("should show the digest of a saved file when you click on it", async () => {
    renderWithData(STORED_FILE);

    fireEvent.click(screen.getByText(FILE_NAME));

    await waitForRecordsToBeShownInTable(LEARNERBLY_RECORDS);
  });

  test("should show file manager when clicking on 'BACK'", async () => {
    renderWithData(STORED_FILE);

    fireEvent.click(screen.getByText(FILE_NAME));

    await waitForRecordsToBeShownInTable(LEARNERBLY_RECORDS);

    fireEvent.click(screen.getByRole("button", { name: "BACK" }));

    await waitFor(() => expect(screen.getByText(FILE_NAME)).toBeVisible());
  });
});

function waitForRecordsToBeShownInTable(records: LearnerblyRecord[]) {
  return waitFor(() => {
    expect(DataTable).toHaveBeenCalledWith(
      expect.objectContaining({
        data: records,
      }),
      expect.anything()
    );
  });
}

function renderWithData(data: string) {
  const storage = aLocalStorage();
  createLearnerblyStore(storage, data);
  render(<App />);

  return storage;
}

function createLearnerblyStore(
  storage: MockProxy<ILocalStorage>,
  content: any
) {
  storage.getItem.mockReturnValue(content);
}

function aLocalStorage() {
  const storage = localStorage() as MockProxy<ILocalStorage>;
  mockReset(storage);
  return storage;
}

function mockFileReader() {
  const reader: any = {
    readAsText: function (file: File) {
      file.text().then(this?.onload);
    },
  };
  jest.mock("../../../instances/file-reader", () => ({
    fileReader: jest.fn().mockReturnValue(reader),
  }));
}
