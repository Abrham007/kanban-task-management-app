import styled from "styled-components";
import { devices } from "../utils/devices";
import IconBoard from "./IconBoard";
import { useContext } from "react";
import { DataContext } from "../MyContext";

const StyledBoardMenu = styled.div`
  width: 276px;
  display: flex;
  flex-direction: column;
  gap: 19px;
  margin-top: 15px;
  & h2 {
    color: inherit;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.15rem;
    margin-left: 32px;
  }

  @media ${devices.tablet} {
    margin-top: 32px;
  }

  @media ${devices.mobile} {
    width: 240px;
    margin-top: 0px;
  }
`;

const Menu = styled.menu`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  & li {
    width: 100%;
    list-style: none;
  }
`;

export const MenuBtn = styled.button`
  width: 100%;
  display: flex;
  gap: 16px;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 15px 32px 15px 32px;
  border-radius: 0px 100px 100px 0px;
  color: inherit;
  font-size: 0.9375rem;
  font-weight: 700;
  transition: 0.3s;

  &:hover {
    background-color: #f4f7fd;
    color: #635fc7;
  }

  &:focus,
  &:active {
    background-color: #635fc7;
    color: #fff;
  }

  &:hover svg {
    fill: #635fc7;
  }

  &:focus svg,
  &:active svg {
    fill: #fff;
  }
`;

const CreateBtn = styled(MenuBtn)`
  color: #635fc7;
`;

export default function BoardMenu() {
  const boardArray = useContext(DataContext);
  const boardNameList = boardArray.map((board) => board.name);
  return (
    <StyledBoardMenu>
      <h2>ALL BOARDS ({boardArray.length})</h2>
      <Menu>
        {boardNameList.map((name) => (
          <li key={name}>
            <MenuBtn>
              <IconBoard></IconBoard>
              <span>{name}</span>
            </MenuBtn>
          </li>
        ))}
        <li>
          <CreateBtn>
            <IconBoard fill="#635FC7"></IconBoard>
            <span>+ Create New Board</span>
          </CreateBtn>
        </li>
      </Menu>
    </StyledBoardMenu>
  );
}
