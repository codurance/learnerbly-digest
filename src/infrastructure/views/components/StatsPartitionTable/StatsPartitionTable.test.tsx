import { render, screen } from "@testing-library/react";
import { PARTITIONS, SPENT_STATS } from "../../../../test/mocks";
import { StatsPartitionTable } from "./StatsPartitionTable";

describe("UNIT: Stats Partition Table", () => {
  test("should show the partition stats in a table", () => {
    const stats = {
      partitions: PARTITIONS,
      stats: SPENT_STATS,
    };
    render(<StatsPartitionTable stats={stats} />);

    PARTITIONS.forEach((partition) => {
      partition.segments.forEach((segment) => {
        expect(screen.getByText(segment)).toBeVisible();
      });
    });

    SPENT_STATS.forEach((stat) => {
      expect(screen.getAllByText(stat.value.toFixed(2))).not.toBeNull();
    });
  });
});
