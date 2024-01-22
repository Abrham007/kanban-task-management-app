import styled from "styled-components";
import { Logo } from "./Header";
import BoardMenu from "./BoardMenu";

const StyledBoard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 0px 47px 0px;
`;

export default function Board() {
  return (
    <StyledBoard>
      <BoardMenu></BoardMenu>
      <div>
        <div></div>
      </div>
    </StyledBoard>
  );
}
