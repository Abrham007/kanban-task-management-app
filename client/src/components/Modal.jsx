import styled from "styled-components";
import { devices } from "../utils/devices";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export const StyledModal = styled.dialog`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  height: max-content;
  border-radius: 6px;
  border: none;
  outline: none;
  padding: 32px;
  overflow: auto;

  &::backdrop {
    opacity: 0.5;
    background: #000;
  }

  @media ${devices.mobile} {
    width: 343px;
    padding: 24px;
  }
`;

export default function Modal({ children, isOpen, setIsOpen }) {
  const dialog = useRef();

  useEffect(() => {
    if (isOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  });

  function handelClose() {
    setIsOpen(false);
  }

  return createPortal(
    <StyledModal ref={dialog} onClose={handelClose}>
      {isOpen && children}
    </StyledModal>,
    document.getElementById("modal")
  );
}
