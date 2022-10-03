import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mock, MockProxy } from "jest-mock-extended";

import { ILocalStorage } from "../../../../domain/repositories/local-storage";
import { LEARNERBLY_DIGEST_STORAGE } from "../../../repositories/browser";
import { localStorage } from "../../../instances/local-storage";
import { DataTable } from "../../components/DataTable/DataTable";
import App from "./App";
import {
  DUMMY_FILE,
  LEARNERBLY_RECORDS,
  STORED_FILE,
} from "../../../../test/mocks";

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
    render(<App />);

    const input = screen.getByTestId("FileInput-hidden-input");
    fireEvent.change(input, {
      target: {
        files: [DUMMY_FILE],
      },
    });

    const storage = aLocalStorage();
    createLearnerblyStore(storage);

    await waitFor(() => {
      expect(DataTable).toHaveBeenCalledWith(
        expect.objectContaining({
          data: LEARNERBLY_RECORDS,
        }),
        expect.anything()
      );
    });

    expect(storage.setItem).toHaveBeenCalledWith(
      LEARNERBLY_DIGEST_STORAGE,
      STORED_FILE
    );
  });
});

function createLearnerblyStore(storage: MockProxy<ILocalStorage>) {
  storage.getItem.mockReturnValue(JSON.stringify({}));
}

function aLocalStorage() {
  return localStorage() as MockProxy<ILocalStorage>;
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
