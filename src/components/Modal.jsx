import styled from "styled-components";
import { devices } from "../utils/devices";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import TaskDetail from "./TaskDetail";

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
  overflow: ${({ $child }) => ($child === "TaskDetail" ? "visible" : "auto")};

  &::backdrop {
    opacity: 0.5;
    background: #000;
  }

  @media ${devices.mobile} {
    width: 343px;
    padding: 24px;
  }
`;

const Modal = forwardRef(function ({ children, child }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <StyledModal ref={dialog} $child={child}>
      {children}
    </StyledModal>,
    document.getElementById("modal")
  );
});

export default Modal;
