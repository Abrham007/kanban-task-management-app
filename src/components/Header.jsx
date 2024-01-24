import Button from "./Button";
import styled, { css } from "styled-components";
import verticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import { devices } from "../utils/devices";

export const StyledHeader = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $isBoardHidden }) => ($isBoardHidden ? "0px 32px 0px 24px" : "0px 32px 0px 34px")};
  transition: all 0.5s linear;

  .Header-text {
    display: flex;
    gap: ${({ $isBoardHidden }) => ($isBoardHidden ? "37px" : "69px")};
    align-items: center;
  }

  .Header-btns {
    display: flex;
    gap: 24px;
  }

  h1 {
    color: inherit;
    font-size: 1.5rem;
    font-weight: 700;
  }

  @media ${devices.tablet} {
    .Header-text {
      gap: ${({ $isBoardHidden }) => ($isBoardHidden ? "24px" : "53px")};
    }
    h1 {
      font-size: 1.25rem;
    }
  }
`;

const VerticalLine = styled.hr`
  ${({ $isBoardHidden }) => {
    if (!$isBoardHidden) {
      return css`
        width: 0;
        height: 0;
      `;
    }
  }}

  transform: rotate(180deg);
  align-self: stretch;
`;

export const Logo = styled.div`
  width: 153px;
  height: 25px;
`;

const EllipsisBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
`;

export default function Header(props) {
  return (
    <StyledHeader $isBoardHidden={props.isBoardHidden}>
      <div className="Header-text">
        <Logo role="presentation"></Logo>
        <VerticalLine $isBoardHidden={props.isBoardHidden}></VerticalLine>
        <h1>Platform Launch</h1>
      </div>

      <div className="Header-btns">
        <Button type={"primary"} size="large">
          + Add New Task
        </Button>
        <EllipsisBtn>
          <img src={verticalEllipsis} alt=""></img>
        </EllipsisBtn>
      </div>
    </StyledHeader>
  );
}
