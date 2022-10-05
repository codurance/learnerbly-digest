import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { LearnerblyRecord } from "../../../../domain/models/learnerbly-record";
import { LEARNERBLY_RECORDS } from "../../../../test/mocks";
import { DataTable } from "../DataTable/DataTable";
import { Report } from "./Report";

jest.mock("../DataTable/DataTable");

describe("ACCEPTANCE: Report", () => {
  const goBack = jest.fn();
  beforeEach(() => {
    goBack.mockReset();
    (DataTable as jest.Mock).mockReset();
    render(<Report data={LEARNERBLY_RECORDS} onGoBack={goBack} />);
  });

  test("should show data table when loaded", () => {
    expectDataTableToRecieveRecords(LEARNERBLY_RECORDS);
  });

  test("should show stats page when clicking on the tab", () => {
    fireEvent.click(screen.getByRole("tab", { name: "Stats" }));

    expect(screen.getByText(/Learnerbly Stats/i)).toBeVisible();
  });

  test("should go back when clicking BACK button", () => {
    fireEvent.click(screen.getByRole("button", { name: "BACK" }));

    expect(goBack).toHaveBeenCalled();
  });

  test("should filter out records with a timeframe smaller than one year when activating the filter", async () => {
    expectDataTableToRecieveRecords(LEARNERBLY_RECORDS);
    (DataTable as jest.Mock).mockReset();

    fireEvent.click(screen.getByRole("checkbox"));

    await waitFor(() =>
      expectDataTableToRecieveRecords(LEARNERBLY_RECORDS.slice(1))
    );
  });
});

function expectDataTableToRecieveRecords(records: LearnerblyRecord[]) {
  expect(DataTable).toHaveBeenCalledWith(
    expect.objectContaining({ data: records }),
    expect.anything()
  );
}
