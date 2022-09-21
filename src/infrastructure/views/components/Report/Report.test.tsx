import { fireEvent, render, screen } from "@testing-library/react";

import { Report } from "./Report";
import { DataTable } from "../DataTable/DataTable";
import { LEARNERBLY_RECORDS } from "../../../../test/mocks";

jest.mock("../DataTable/DataTable");

describe("ACCEPTANCE: Report", () => {
  test("should show data table when loaded", () => {
    render(<Report data={LEARNERBLY_RECORDS} />);
    expect(DataTable).toHaveBeenCalledWith(
      expect.objectContaining({ data: LEARNERBLY_RECORDS }),
      expect.anything()
    );
  });

  test("should show stats page when clicking on the tab", () => {
    render(<Report data={LEARNERBLY_RECORDS} />);

    fireEvent.click(screen.getByRole("tab", { name: "Stats" }));

    expect(screen.getByText(/Learnerbly Stats/i)).toBeVisible();
  });
});
