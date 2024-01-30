import InputTextField from "./InputTextField";
import IconCross from "./IconCross";
import { Modal, Label, InputContainer } from "./ModalStyles.";
import Button from "./Button";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ModalAddEditBoard = forwardRef(function (props, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <Modal ref={dialog}>
      <h3>Add New Board</h3>
      <Label>
        <span>Name</span>
        <InputTextField></InputTextField>
      </Label>
      <Label>
        <span>Columns</span>
        <InputContainer as="div">
          <div>
            <InputTextField></InputTextField>
            <button>
              <IconCross></IconCross>
            </button>
          </div>
          <div>
            <InputTextField></InputTextField>
            <button>
              <IconCross></IconCross>
            </button>
          </div>
          <Button type="secondary">+ Add New Column</Button>
        </InputContainer>
      </Label>
      <Button>Create New Board</Button>
    </Modal>,
    document.getElementById("modal")
  );
});

export default ModalAddEditBoard;
