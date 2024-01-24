import styled from "styled-components";
import { devices } from "../utils/devices";

const StyledBoardMenu = styled.div`
  width: 276px;
  display: flex;
  flex-direction: column;
  gap: 19px;
  margin-top: 15px;
  & h2 {
    color: #828fa3;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.15rem;
    margin-left: 32px;
  }

  @media ${devices.laptop} {
    margin-top: 32px;
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
  color: #828fa3;
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
  return (
    <StyledBoardMenu>
      <h2>ALL BOARDS (3)</h2>
      <Menu>
        <li>
          <MenuBtn>
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="#828FA3">
              <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
            </svg>
            <span>Platform Launch</span>
          </MenuBtn>
        </li>
        <li>
          <MenuBtn>
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="#828FA3">
              <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
            </svg>
            <span>Marketing Plan</span>
          </MenuBtn>
        </li>
        <li>
          <MenuBtn>
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="#828FA3">
              <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
            </svg>
            <span>Roadmap</span>
          </MenuBtn>
        </li>
        <li>
          <CreateBtn>
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="#635fc7">
              <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
            </svg>
            <span>+ Create New Board</span>
          </CreateBtn>
        </li>
      </Menu>
    </StyledBoardMenu>
  );
}
