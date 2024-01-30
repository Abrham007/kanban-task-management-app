import InputTextField from "./InputTextField";
import Button from "./Button";
import InputDropdown from "./InputDropdown";
import IconCross from "./IconCross";
import { Modal, Label, InputContainer } from "./ModalStyles.";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ModalAddEditTask = forwardRef(function (props, ref) {
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
      <h3>Add New Task</h3>
      <Label>
        <span>Title</span>
        <InputTextField></InputTextField>
      </Label>
      <Label>
        <span>Description</span>
        <InputTextField as="textarea"></InputTextField>
      </Label>
      <Label as="div">
        <span>Subtasks</span>
        <InputContainer>
          <li>
            <InputTextField></InputTextField>
            <button>
              <IconCross></IconCross>
            </button>
          </li>
          <li>
            <InputTextField></InputTextField>
            <button>
              <IconCross></IconCross>
            </button>
          </li>
          <Button type="secondary">+ Add New Subtask</Button>
        </InputContainer>
      </Label>
      <Label>
        <span>Status</span>
        <InputDropdown></InputDropdown>
      </Label>
      <Button>Create Task</Button>
    </Modal>,
    document.getElementById("modal")
  );
});

export default ModalAddEditTask;
