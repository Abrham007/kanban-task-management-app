import InputTextField from "./InputTextField";
import IconCross from "./IconCross";
import { Modal, Label, InputContainer } from "./ModalStyles.";
import Button from "./Button";

export default function ModalAddEditBoard() {
  return (
    <Modal>
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
      <Button size="large">Create New Board</Button>
    </Modal>
  );
}
