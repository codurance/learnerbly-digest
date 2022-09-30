import styled from "@emotion/styled";
import { colors } from "../../styles/colors";

export const PartitionTable = styled.table`
  border: 1px solid ${colors.midGray};
  border-radius: 3px;

  tr {
    border-bottom: 1px solid ${colors.gray};
  }

  th {
    font-weight: normal;
    padding: 0.5rem;
  }
`;
