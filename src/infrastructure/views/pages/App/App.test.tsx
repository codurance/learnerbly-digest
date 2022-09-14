import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import App from "./App";

const CONTENT = "content";

test("when a file is uploaded its contents should appear on screen", async () => {
  mockFileReader();
  render(<App />);

  const input = screen.getByTestId("FileInput-hidden-input");
  fireEvent.change(input, {
    target: { files: [new File([CONTENT], "name.csv", { type: "csv" })] },
  });

  await waitFor(async () =>
    expect(await screen.findByText("content")).toBeVisible()
  );
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
