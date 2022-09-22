import { LearnerblyRecord } from "../../../../domain/models/learnerbly-record";
import { Container, ReportStatsHeadline, ReportStatsTable } from "./styles";

export type ReportStatsProps = {
  data: LearnerblyRecord[];
};

export const ReportStats = (props: ReportStatsProps) => {
  const averageUsage = getAverageUsage(props.data);
  const averageUsagePercentage = getAverageUsagePercentage(props.data);

  return (
    <Container>
      <ReportStatsHeadline>Learnerbly Stats</ReportStatsHeadline>
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
    </Container>
  );
};

function getAverageUsagePercentage(data: LearnerblyRecord[]) {
  return columnAverage("budgetUsage")(data).toFixed(2);
}

function getAverageUsage(data: LearnerblyRecord[]) {
  return columnAverage("spent")(data).toFixed(2);
}

function columnAverage(field: string) {
  return (records: LearnerblyRecord[]) =>
    records.reduce((acc, row) => acc + row[field], 0) / records.length;
}
