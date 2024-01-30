import styled from "styled-components";
import verticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import { useState } from "react";

const EllipsisContainer = styled.div`
  position: relative;
`;

const StyledEllipsisButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  padding: 10px;
`;

export const EllipsisOptionContainer = styled.menu`
  position: absolute;
  top: 58px;
  right: 0;
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: 192px;
  flex-shrink: 0;
  border-radius: 8px;
  box-shadow: 0px 10px 20px 0px rgba(54, 78, 126, 0.25);
  color: #828fa3;
  transform: ${({ $purpose }) => ($purpose === "Board" ? "" : "translateX(50%)")};

  li {
    list-style: none;
  }

  li:nth-last-of-type(1) {
    color: #ea5555;
  }

  button {
    border: none;
    outline: none;
    background-color: transparent;
    text-align: left;
    color: inherit;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4375rem;
  }
`;

export default function EllipsisButton({ purpose = "Board", handleEdit, handleDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((prevValue) => !prevValue);
  }

  return (
    <>
      <EllipsisContainer>
        <StyledEllipsisButton onClick={toggleOpen}>
          <img src={verticalEllipsis} alt=""></img>
        </StyledEllipsisButton>
        <EllipsisOptionContainer $isOpen={isOpen} $purpose={purpose}>
          <li>
            <button onClick={handleEdit}>Edit {purpose}</button>
          </li>
          <li>
            <button onClick={handleDelete}>Delete {purpose}</button>
          </li>
        </EllipsisOptionContainer>
      </EllipsisContainer>
    </>
  );
}
