import styled from "styled-components";
import InputTextField from "./InputTextField";
import Button from "./Button";
import InputDropdown from "./InputDropdown";
import InputContainer from "./InputContainer";

const StyledAddEditTask = styled.div`
  width: 100%;

  & > * {
    margin-bottom: 24px;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
  }

  label {
    font-size: 0.75rem;
    font-weight: 700;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export default function AddEditTask({ isEdit, ...props }) {
  return (
    <StyledAddEditTask>
      <h3>{isEdit ? "Edit" : "Add New"} Task</h3>
      <div>
        <label>Title</label>
        <InputTextField defaultValue={props.title} placeholder="e.g. Take coffee break"></InputTextField>
      </div>
      <div>
        <label>Description</label>
        <InputTextField
          as="textarea"
          defaultValue={props.description}
          placeholder={
            "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          }
        ></InputTextField>
      </div>
      <div>
        <label>Subtasks</label>
        <InputContainer purpose="task" defaultInputs={props.subtasks?.map((task) => task.title)}></InputContainer>
      </div>
      <div>
        <label>Status</label>
        <InputDropdown status={props.status}></InputDropdown>
      </div>
      <Button>Create Task</Button>
    </StyledAddEditTask>
  );
}
