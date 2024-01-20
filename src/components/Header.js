import Button from "./Button";
import styled from "styled-components";
import logoLight from "../assets/logo-light.svg";

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 32px 0px 24px;

  &.Header-text {
    display: flex;
    gap: 65px;
  }

  &.Header-btns {
    display: flex;
    gap: 24px;
  }

  & h2 {
    color: #000112;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <div className="Header-text">
        <h1>
          <div role="presentation"></div>
          <span>kanban</span>
        </h1>
        <hr></hr>
        <h2>Platform Launch</h2>
      </div>

      <div className="Header-btns">
        <Button type={"primary"}>add coulmen</Button>
        <button></button>
      </div>
    </StyledHeader>
  );
}
