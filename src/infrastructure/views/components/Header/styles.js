import styled from "@emotion/styled";

import { colors } from "../../styles/colors.js";

export const Container = styled.header`
  background-color: ${colors.white};
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  box-sizing: border-box;
  padding: 1.5rem;
  box-shadow: 0 1px 3px hsla(0, 0%, 100%, 0.12), 0 1px 10px rgba(0, 0, 0, 0.12);

  img {
    height: 20px;
  }
`;
