import { render, screen } from "@testing-library/react";
import { LEARNERBLY_RECORDS } from "../../../../test/mocks";
import { ReportStats } from "./ReportStats";

describe("UNIT: Report Stats", () => {
  beforeEach(() => {
    render(<ReportStats data={LEARNERBLY_RECORDS} />);
  });

  test("should calculate the average usage of the budget", () => {
    expect(screen.getByText("217.97")).toBeVisible();
  });

  test("should calculate the average usage percentage of the budget", () => {
    expect(screen.getByText("72.66%")).toBeVisible();
  });
});
