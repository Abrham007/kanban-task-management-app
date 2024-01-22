import styled from "styled-components";
import boardIcon from "../assets/icon-board.svg";
const StyledBoardMenu = styled.div`
  width: 276px;
  display: flex;
  flex-direction: column;
  gap: 19px;

  & h2 {
    color: #828fa3;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.15rem;
    margin-left: 32px;
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

  & button {
    width: 100%;
    display: flex;
    gap: 16px;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 15px 32px 15px 32px;
    border-radius: 0px 100px 100px 0px;
    color: #828fa3;
    font-size: 0.9375rem;
    font-weight: 700;
  }

  & button:focus,
  & button:hover {
    background-color: #635fc7;
  }
`;

export default function BoardMenu() {
  return (
    <StyledBoardMenu>
      <h2>ALL BOARDS (3)</h2>
      <Menu>
        <li>
          <button>
            <img src={boardIcon} alt=""></img>
            <span>Platform Launch</span>
          </button>
        </li>
        <li>
          <button>
            <img src={boardIcon} alt=""></img>
            <span>Marketing Plan</span>
          </button>
        </li>
        <li>
          <button>
            <img src={boardIcon} alt=""></img>
            <span>Roadmap</span>
          </button>
        </li>
      </Menu>
    </StyledBoardMenu>
  );
}
