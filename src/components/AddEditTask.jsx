import styled from "styled-components";
import InputTextField from "./InputTextField";
import Button from "./Button";
import InputDropdown from "./InputDropdown";
import InputContainer from "./InputContainer";
import { useState } from "react";

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
  const [taskDetail, setTaskDetail] = useState({
    title: props.title ?? "",
    description: props.description ?? "",
    status: props.status,
    subtasks: { subtask1: "", subtask2: "" },
  });
  return (
    <StyledAddEditTask>
      <h3>{isEdit ? "Edit" : "Add New"} Task</h3>
      <div>
        <label htmlFor="taskName">Title</label>
        <InputTextField
          name="taskName"
          id="taskName"
          defaultValue={taskDetail.title}
          placeholder="e.g. Take coffee break"
        ></InputTextField>
      </div>
      <div>
        <label htmlFor="taskDescription">Description</label>
        <InputTextField
          name="taskDescription"
          id="taskDescription"
          as="textarea"
          defaultValue={taskDetail.description}
          placeholder={
            "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          }
        ></InputTextField>
      </div>
      <div>
        <label>Subtasks</label>
        <InputContainer
          purpose="task"
          defaultInputs={taskDetail.subtasks}
          placeholder={["e.g. Make coffee", "e.g. Drink coffee & smile"]}
        ></InputContainer>
      </div>
      <div>
        <label>Status</label>
        <InputDropdown status={taskDetail.status}></InputDropdown>
      </div>
      <Button>Create Task</Button>
    </StyledAddEditTask>
  );
}
