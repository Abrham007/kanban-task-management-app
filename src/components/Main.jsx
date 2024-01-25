import styled, { css } from "styled-components";
import MainEmpty from "./MainEmpty";
import { devices } from "../utils/devices";
import { useContext } from "react";
import { MyContext } from "../MyContext";

export const StyledMain = styled.main`
  position: relative;
  grid-area: main;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  transition: all 0.5s linear;

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
  const { isBoardHidden } = useContext(MyContext);
  return (
    <StyledMain $isBoardHidden={isBoardHidden}>
      <MainEmpty></MainEmpty>
    </StyledMain>
  );
}
