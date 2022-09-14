import styled from "@emotion/styled";

import { colors } from "../../styles/colors";

export const ButtonContainer = styled.input`
  background: ${colors.primary};
  color: ${colors.white};
  font-size: 16px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  padding: 0.6rem 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);

  :hover {
    background: ${colors.primaryDark};
  }
`;
