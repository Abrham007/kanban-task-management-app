import styled from "styled-components";
import InputTextField from "./InputTextField";
import Button from "./Button";
import InputDropdown from "./InputDropdown";
import IconCross from "./IconCross";

export const AddEditTask = styled.dialog`
  position: absolute;
  top: calc(50% - 240px);
  left: calc(50% - 260px);
  width: 480px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 6px;
  border: none;
  outline: none;
  padding: 32px;

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
  }

  span {
    font-size: 0.75rem;
    font-weight: 700;
  }
`;

const AddEditTaskLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > div {
    display: flex;
    gap: 16px;
  }

  & > div > button {
    background-color: transparent;
    border: none;
    outline: none;

    &:focus svg,
    &:hover svg {
      fill: #ea5555;
    }
  }
`;

export default function ModalAddEditTask() {
  return (
    <AddEditTask>
      <h3>Add New Task</h3>
      <AddEditTaskLabel>
        <span>Title</span>
        <InputTextField></InputTextField>
      </AddEditTaskLabel>
      <AddEditTaskLabel>
        <span>Description</span>
        <InputTextField as="textarea"></InputTextField>
      </AddEditTaskLabel>
      <AddEditTaskLabel as="div">
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
      </AddEditTaskLabel>
      <AddEditTaskLabel>
        <span>Status</span>
        <InputDropdown></InputDropdown>
      </AddEditTaskLabel>
      <Button size="large">Create Task</Button>
    </AddEditTask>
  );
}
