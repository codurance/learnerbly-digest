import { fireEvent, render, screen } from "@testing-library/react";

import { Report } from "./Report";
import { DataTable } from "../DataTable/DataTable";
import { LEARNERBLY_RECORDS } from "../../../../test/mocks";

jest.mock("../DataTable/DataTable");

describe("ACCEPTANCE: Report", () => {
  const goBack = jest.fn();
  beforeEach(() => {
    goBack.mockReset();
    render(<Report data={LEARNERBLY_RECORDS} onGoBack={goBack} />);
  });

  test("should show data table when loaded", () => {
    expect(DataTable).toHaveBeenCalledWith(
      expect.objectContaining({ data: LEARNERBLY_RECORDS }),
      expect.anything()
    );
  });

  test("should show stats page when clicking on the tab", () => {
    fireEvent.click(screen.getByRole("tab", { name: "Stats" }));

    expect(screen.getByText(/Learnerbly Stats/i)).toBeVisible();
  });

  test("should go back when clicking BACK button", () => {
    fireEvent.click(screen.getByRole("button", { name: "BACK" }));

    expect(goBack).toHaveBeenCalled();
  });
});
