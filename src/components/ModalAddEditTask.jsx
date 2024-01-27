import InputTextField from "./InputTextField";
import Button from "./Button";
import InputDropdown from "./InputDropdown";
import IconCross from "./IconCross";
import { Modal, Label, InputContainer } from "./ModalStyles.";

export default function ModalAddEditTask() {
  return (
    <Modal>
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
          <Button type="secondary">+ Add New Subtask</Button>
        </InputContainer>
      </Label>
      <Label>
        <span>Status</span>
        <InputDropdown></InputDropdown>
      </Label>
      <Button size="large">Create Task</Button>
    </Modal>
  );
}
