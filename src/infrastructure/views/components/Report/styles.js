import styled from "@emotion/styled";
import { colors } from "../../styles/colors";

export const ReportContainer = styled.section`
  margin: 3rem auto;
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  max-width: 1200px;
`;

export const ReportHeader = styled.header`
  border-bottom: 1px solid ${colors.lightGray};
`;

export const ReportContent = styled.section`
  padding: 1rem;
`;
