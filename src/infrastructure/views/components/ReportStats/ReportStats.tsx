import { LearnerblyRecord } from "../../../../domain/models/learnerbly-record";
import { learnerblyStatsService } from "../../../../domain/services/learnerbly-stats";
import { columnAverage } from "../../../../domain/common/calc";
import { StatsPartitionTable } from "../StatsPartitionTable/StatsPartitionTable";
import {
  Container,
  ReportBody,
  ReportStatsHeadline,
  ReportStatsTable,
  GlobalStats,
} from "./styles";

const service = learnerblyStatsService();

export type ReportStatsProps = {
  data: LearnerblyRecord[];
};

export const ReportStats = (props: ReportStatsProps) => {
  const averageUsage = getAverageUsage(props.data);
  const averageUsagePercentage = getAverageUsagePercentage(props.data);
  const partitionsStats = service.calculateStats(props.data);
  const { spent, budgetUsage } = partitionsStats;

  return (
    <Container>
      <ReportStatsHeadline>Learnerbly Stats</ReportStatsHeadline>
      <ReportBody>
        <StatsPartitionTable title="Average Spent" stats={spent} />
        <StatsPartitionTable title="Average Usage (%)" stats={budgetUsage} />
        <GlobalStats>
          <h4>Global Stats</h4>
          <ReportStatsTable>
            <tbody>
              <tr>
                <th>Average usage:</th>
                <th>{averageUsage}</th>
              </tr>
              <tr>
                <th>Average usage percentage:</th>
                <th>{averageUsagePercentage}%</th>
              </tr>
            </tbody>
          </ReportStatsTable>
        </GlobalStats>
      </ReportBody>
    </Container>
  );
};

function getAverageUsagePercentage(data: LearnerblyRecord[]) {
  return columnAverage("budgetUsage")(data).toFixed(2);
}

function getAverageUsage(data: LearnerblyRecord[]) {
  return columnAverage("spent")(data).toFixed(2);
}
