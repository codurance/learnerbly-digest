import {
  Partition,
  PartitionStats,
  SegmentedStat,
} from "../../../../domain/models/stats";
import { PartitionTable } from "./styles";

export type StatsPartitionTableProps = {
  title?: string;
  stats: PartitionStats;
};

export const StatsPartitionTable = (props: StatsPartitionTableProps) => {
  const { partitions, stats } = props.stats;

  const ySegments = partitions[0].segments;
  const xSegments = partitions[1].segments;

  return (
    <div>
      <h4>{props.title}</h4>
      <PartitionTable>
        <thead>
          <tr>
            <th></th>
            {xSegments.map((segment) => (
              <th key={segment}>{segment}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ySegments.map((segment, i) => (
            <tr key={segment}>
              <th>{segment}</th>
              {getRowElements(xSegments.length, stats, i).map(
                createCell(partitions, i)
              )}
            </tr>
          ))}
        </tbody>
      </PartitionTable>
    </div>
  );
};

function getRowElements(rowLength: number, stats: SegmentedStat[], i: number) {
  return stats.slice(i * rowLength, (i + 1) * rowLength);
}

function createCell(
  partitions: Partition[],
  i: number
): (
  value: SegmentedStat,
  index: number,
  array: SegmentedStat[]
) => JSX.Element {
  return (stat, j) => (
    <th key={getCellKey(partitions, i, j)}>{formatStatValue(stat)}</th>
  );
}

function getCellKey(partitions: Partition[], i: number, j: number) {
  return `${partitions[0].segments[j]}-${partitions[1].segments[i]}`;
}

function formatStatValue(stat: SegmentedStat) {
  if (isNaN(stat.value)) return "-";
  return stat.value.toFixed(2);
}
