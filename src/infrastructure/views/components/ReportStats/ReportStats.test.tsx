import { render, screen } from "@testing-library/react";
import {
  BUDGET_USAGE_STATS,
  LEARNERBLY_RECORDS,
  PARTITIONS,
  SPENT_STATS,
} from "../../../../test/mocks";
import { StatsPartitionTable } from "../StatsPartitionTable/StatsPartitionTable";
import { ReportStats } from "./ReportStats";

jest.mock("../StatsPartitionTable/StatsPartitionTable");

describe("UNIT: Report Stats", () => {
  beforeEach(() => {
    render(<ReportStats data={LEARNERBLY_RECORDS} />);
  });

  test("should calculate the average usage of the budget", () => {
    expect(screen.getByText("150.00")).toBeVisible();
  });

  test("should calculate the average usage percentage of the budget", () => {
    expect(screen.getByText("50.00%")).toBeVisible();
  });

  test("should send partitioned stats to its table component", () => {
    expect(StatsPartitionTable).toHaveBeenCalledWith(
      expect.objectContaining({
        stats: {
          partitions: PARTITIONS,
          stats: SPENT_STATS,
        },
      }),
      expect.anything()
    );
    expect(StatsPartitionTable).toHaveBeenCalledWith(
      expect.objectContaining({
        stats: {
          partitions: PARTITIONS,
          stats: BUDGET_USAGE_STATS,
        },
      }),
      expect.anything()
    );
  });
});
