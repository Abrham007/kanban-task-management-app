import styled, { css } from "styled-components";
import MainEmpty from "./MainEmpty";
import { devices } from "../utils/devices";
import { useContext } from "react";
import { BoardContext, DataContext } from "../MyContext";
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
    ${({ $isBoardHidden }) => {
      if ($isBoardHidden) {
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
  const { isBoardHidden } = useContext(BoardContext);
  const boardArray = useContext(DataContext);
  return (
    <StyledMain $isBoardHidden={isBoardHidden} $isMainEmpty={false}>
      {/* <MainEmpty></MainEmpty> */}
      <TaskBoard activeBoard={boardArray[0]}></TaskBoard>
    </StyledMain>
  );
}
