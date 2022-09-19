import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { CSV_RAW_CONTENT, CSV_ROWS } from "../../../../test/mocks";
import { DataTable } from "../../components/DataTable/DataTable";

import App from "./App";

mockFileReader();
jest.mock("../../components/DataTable/DataTable");

describe("App", () => {
  test("when a file is uploaded its contents should be sent to the DataTable", async () => {
    render(<App />);

    const input = screen.getByTestId("FileInput-hidden-input");
    fireEvent.change(input, {
      target: {
        files: [new File([CSV_RAW_CONTENT], "name.csv", { type: "csv" })],
      },
    });

    await waitFor(() => {
      expect(DataTable).toHaveBeenCalledWith(
        expect.objectContaining({
          data: CSV_ROWS,
        }),
        expect.anything()
      );
    });
  });
});

function mockFileReader() {
  const reader: any = {
    readAsText: function (file: File) {
      file.text().then(this?.onload);
    },
  };
  jest.mock("../../../instances/file-reader", () => {
    const mock = jest.fn();
    mock.mockReturnValue(reader);
    return {
      __esModule: true,
      fileReader: mock,
    };
  });
}
