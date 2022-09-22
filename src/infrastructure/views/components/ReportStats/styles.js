import styled from "@emotion/styled";
import { colors } from "../../styles/colors";

export const Container = styled.article`
  padding: 0 1rem 1rem 1rem;
`;

export const ReportStatsHeadline = styled.h2`
  margin: 1rem 0 2rem 0;
`;

export const ReportStatsTable = styled.table`
  border: 1px solid ${colors.midGray};
  border-radius: 3px;

  tr {
    border-bottom: 1px solid ${colors.midGray};
  }

  tr:last-of-type {
    border-bottom: none;
  }

  th {
    font-weight: normal;
    text-align: left;
    padding: 0.5rem;
  }
`;
