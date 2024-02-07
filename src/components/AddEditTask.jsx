import styled from "styled-components";
import InputTextField from "./InputTextField";
import Button from "./Button";
import InputDropdown from "./InputDropdown";
import InputContainer from "./InputContainer";
import { useContext, useState } from "react";
import { DataContext } from "../MyContext";

const StyledAddEditTask = styled.div`
  width: 100%;

  & > * {
    margin-bottom: 24px;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
  }

  span {
    font-size: 0.75rem;
    font-weight: 700;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export default function AddEditTask({ isEdit, ...props }) {
  const { projectArray, columnArray, selectedProjectId, addTask } = useContext(DataContext);
  const activeProject = projectArray.find((project) => project.id === selectedProjectId);
  const activeProjectColumns = columnArray.filter((col) => col.project_id === activeProject.id);
  const statuslist = columnArray.filter((col) => col.project_id === activeProject.id).map((col) => col.name);
  const defaultStatus = statuslist[0];
  const [taskDetail, setTaskDetail] = useState({
    title: props.title ?? "",
    description: props.description ?? "",
    status: props.status ?? defaultStatus,
    subtasks: { subtask1: "", subtask2: "" },
  });

  function handleRemoveInputs(name) {
    setTaskDetail((prevValue) => {
      let tempSubtaskList = { ...prevValue.subtasks };
      delete tempSubtaskList[name];
      return {
        ...prevValue,
        subtasks: tempSubtaskList,
      };
    });
  }

  function handleAddInputs() {
    let name = "subtask" + (Object.keys(taskDetail.subtasks).length + 1);
    setTaskDetail((prevValue) => {
      return {
        ...prevValue,
        subtasks: { ...prevValue.subtasks, [name]: "" },
      };
    });
  }

  function createNewTask(name, value) {
    let subtaskPattern = /subtask/;
    if (subtaskPattern.test(name)) {
      setTaskDetail((prevValue) => {
        return {
          ...prevValue,
          subtasks: { ...prevValue.subtasks, [name]: value },
        };
      });
    } else {
      setTaskDetail((prevValue) => {
        return {
          ...prevValue,
          [name]: value,
        };
      });
    }
  }

  function handleAddTask() {
    const columnOfTask = activeProjectColumns.find((col) => col.name === taskDetail.status);
    let newTask = {
      ...taskDetail,
      column_id: columnOfTask.id,
      project_id: selectedProjectId,
    };

    addTask(newTask);
  }

  return (
    <StyledAddEditTask>
      <h3>{isEdit ? "Edit" : "Add New"} Task</h3>
      <label>
        <span>Title</span>
        <InputTextField
          name="title"
          onChange={createNewTask}
          defaultValue={taskDetail.title}
          placeholder="e.g. Take coffee break"
        ></InputTextField>
      </label>
      <label>
        <span>Description</span>
        <InputTextField
          name="description"
          onChange={createNewTask}
          as="textarea"
          defaultValue={taskDetail.description}
          placeholder={
            "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          }
        ></InputTextField>
      </label>
      <label>
        <span>Subtasks</span>
        <InputContainer
          onChange={createNewTask}
          purpose="task"
          defaultInputs={taskDetail.subtasks}
          placeholder={["e.g. Make coffee", "e.g. Drink coffee & smile"]}
          handleAddInputs={handleAddInputs}
          handleRemoveInputs={handleRemoveInputs}
        ></InputContainer>
      </label>
      <label>
        <span>Status</span>
        <InputDropdown name="status" status={taskDetail.status} onChange={createNewTask}></InputDropdown>
      </label>
      <Button onClick={handleAddTask}>Create Task</Button>
    </StyledAddEditTask>
  );
}
