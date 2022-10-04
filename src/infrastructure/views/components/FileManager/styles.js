import styled from "@emotion/styled";
import { colors } from "../../styles/colors";

export const FileManagerContainer = styled.article`
  display: flex;
  padding: 2rem;
  justify-content: space-between;
`;

export const FileList = styled.ul`
  list-style: none;
  flex-basis: 70%;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  border: 1px solid ${colors.midGray};
  min-height: 400px;
  background-color: ${colors.lightGray};
`;

export const FileListItem = styled.li`
  font-size: 20px;
  padding: 0.5rem 1rem;
  border-bottom: 1px dashed ${colors.midGray};
  :hover {
    background-color: white;
    cursor: pointer;
  }

  &:first-of-type {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
`;

export const FileManagerActions = styled.div`
  flex-basis: 25%;
`;
