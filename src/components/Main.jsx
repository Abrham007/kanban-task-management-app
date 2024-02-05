import styled, { css } from "styled-components";
import MainEmpty from "./MainEmpty";
import { devices } from "../utils/devices";
import { useContext } from "react";
import { SideBarContext, DataContext } from "../MyContext";
import TaskBoard from "./TaskBoard";

export const StyledMain = styled.main`
  grid-area: main;
  display: flex;
  align-items: ${({ $isMainEmpty }) => ($isMainEmpty ? "center" : "flex-start")};
  justify-content: ${({ $isMainEmpty }) => ($isMainEmpty ? "center" : "flex-start")};
  padding: 24px;
  transition: all 0.5s linear;
  overflow: auto;

  @media ${devices.mobile} {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0, 0, 0, 0.4);
      opacity: 0;
      transition: opacity 0.5s linear;
    }
    ${({ $isSideBarHidden }) => {
      if ($isSideBarHidden) {
        return css`
          &::after {
            opacity: 1;
          }
        `;
      }
    }}
  }
`;

export default function Main() {
  const { isSideBarHidden } = useContext(SideBarContext);
  const { projectArray, columnArray, selectedProjectId } = useContext(DataContext);
  const isEmptyBoard = projectArray.length === 0;
  let isEmptyColumn = true;
  let activeBoard;

  if (!isEmptyBoard) {
    activeBoard = projectArray.find((project) => project.id === selectedProjectId);
    const selectedColumn = columnArray.filter((col) => col.project_id === activeBoard.id);
    isEmptyColumn = !selectedColumn || selectedColumn.length === 0;
  }
  return (
    <StyledMain $isSideBarHidden={isSideBarHidden} $isMainEmpty={isEmptyColumn}>
      {isEmptyBoard || isEmptyColumn ? (
        <MainEmpty isEmptyBoard={isEmptyBoard} isEmptyColumn={isEmptyColumn}></MainEmpty>
      ) : (
        <TaskBoard></TaskBoard>
      )}
    </StyledMain>
  );
}
