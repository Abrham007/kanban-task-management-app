import InputTextField from "./InputTextField";
import IconCross from "./IconCross";
import { Modal, Label, InputContainer } from "./ModalStyles.";
import Button from "./Button";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ModalAddEditBoard = forwardRef(function ({ name, boardColumns }, ref) {
  const dialog = useRef();
  let defaultColumnNames = ["Todo", "Doing"];

  if (boardColumns) {
    defaultColumnNames = boardColumns.map((col) => col.name);
  }

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
        <InputTextField defaultValue={name} placeholder="e.g. Web Design"></InputTextField>
      </Label>
      <Label>
        <span>Columns</span>
        <InputContainer>
          {defaultColumnNames.map((name) => (
            <li key={name}>
              <InputTextField defaultValue={name}></InputTextField>
              <button>
                <IconCross></IconCross>
              </button>
            </li>
          ))}
          <Button type="secondary">+ Add New Column</Button>
        </InputContainer>
      </Label>
      <Button>Create New Board</Button>
    </Modal>,
    document.getElementById("modal")
  );
});

export default ModalAddEditBoard;
