import styled from "@emotion/styled";
import { colors } from "../../styles/colors";

export const Main = styled.main`
  padding: 2rem;
`;

export const H1 = styled.h1`
  font-size: 32px;
  text-align: center;
`;

export const Card = styled.section`
  margin: 3rem auto;
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  max-width: 1200px;
`;
