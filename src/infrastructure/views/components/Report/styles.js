import styled from "@emotion/styled";
import { colors } from "../../styles/colors";

export const ReportContainer = styled.section``;

export const ReportHeader = styled.header`
  border-bottom: 1px solid ${colors.lightGray};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReportContent = styled.section`
  padding: 1rem;
`;

export const BackButton = styled.button`
  border: none;
  background-color: white;
  color: ${colors.midGray};
  cursor: pointer;
  font-size: 0.875rem;
  padding: 12px 16px;
  line-height: 1.25;
  letter-spacing: 0.02857em;
  margin-left: 1rem;
  min-height: 48px;
  :hover {
    background-color: ${colors.lightGray};
  }
`;

export const Expander = styled.div`
  flex: 1;
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
`;

export const SwitchLabel = styled.label`
  color: ${colors.midGray};
  font-size: 0.875rem;
  padding: 12px 0;
  line-height: 1.25;
  letter-spacing: 0.02857em;
  margin-left: 1rem;
  text-transform: uppercase;
`;
