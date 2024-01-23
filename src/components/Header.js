import Button from "./Button";
import styled from "styled-components";
import verticalEllipsis from "../assets/icon-vertical-ellipsis.svg";

export const StyledHeader = styled.header`
  height: 96px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 32px 0px 24px;

  .Header-text {
    display: flex;
    gap: 32px;
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
`;

const VerticalLine = styled.hr`
  & {
    transform: rotate(180deg);
    align-self: stretch;
  }
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

export default function Header() {
  return (
    <StyledHeader>
      <div className="Header-text">
        <Logo role="presentation"></Logo>
        <VerticalLine></VerticalLine>
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
