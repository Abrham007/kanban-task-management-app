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

  let subtaskInputList = (
    <>
      <li>
        <InputTextField placeholder="e.g. Make coffee"></InputTextField>
        <button>
          <IconCross></IconCross>
        </button>
      </li>
      <li>
        <InputTextField placeholder="e.g. Drink coffee & smile"></InputTextField>
        <button>
          <IconCross></IconCross>
        </button>
      </li>
    </>
  );

  if (props.subtasks) {
    subtaskInputList = props.subtasks.map((subtask) => (
      <li>
        <InputTextField defaultValue={subtask.title}></InputTextField>
        <button>
          <IconCross></IconCross>
        </button>
      </li>
    ));
  }
  return createPortal(
    <Modal ref={dialog}>
      <h3>Add New Task</h3>
      <Label>
        <span>Title</span>
        <InputTextField defaultValue={props.title} placeholder="e.g. Take coffee break"></InputTextField>
      </Label>
      <Label>
        <span>Description</span>
        <InputTextField
          as="textarea"
          defaultValue={props.description}
          placeholder={
            "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          }
        ></InputTextField>
      </Label>
      <Label as="div">
        <span>Subtasks</span>
        <InputContainer>
          {subtaskInputList}
          <Button type="secondary">+ Add New Subtask</Button>
        </InputContainer>
      </Label>
      <Label>
        <span>Status</span>
        <InputDropdown status={props.status}></InputDropdown>
      </Label>
      <Button>Create Task</Button>
    </Modal>,
    document.getElementById("modal")
  );
});

export default ModalAddEditTask;
