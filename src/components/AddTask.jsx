import styled from "styled-components";
import InputTextField from "./InputTextField";
import Button from "./Button";
import InputDropdown from "./InputDropdown";
import InputContainer from "./InputContainer";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/DataContext";

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

  label,
  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export default function AddTask(props) {
  const { projectArray, columnArray, selectedProjectId, addTask } = useContext(DataContext);
  const activeProject = projectArray.find((project) => project.id === selectedProjectId);
  const activeProjectColumns = columnArray.filter((col) => col.project_id === activeProject.id);
  const statuslist = columnArray.filter((col) => col.project_id === activeProject.id).map((col) => col.name);
  const defaultStatus = statuslist[0];
  const [taskDetail, setTaskDetail] = useState({
    title: "",
    description: "",
    status: defaultStatus,
    subtasks: { subtask1: { title: "", is_completed: false }, subtask2: { title: "", is_completed: false } },
  });
  const [invalidInputList, setInvalidInputList] = useState([]);

  let defaultInputs = {};

  for (let [key, value] of Object.entries(taskDetail.subtasks)) {
    defaultInputs[key] = value.title;
  }

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
        subtasks: { ...prevValue.subtasks, [name]: { title: "", is_completed: false } },
      };
    });
  }

  function createNewTask(name, value) {
    let subtaskPattern = /subtask/;
    if (subtaskPattern.test(name)) {
      setTaskDetail((prevValue) => {
        return {
          ...prevValue,
          subtasks: { ...prevValue.subtasks, [name]: { title: value, is_completed: false } },
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

  function handleAddTask(e) {
    let invalidList = [];
    if (taskDetail.title === "") {
      invalidList.push("title");
    }

    for (let [key, value] of Object.entries(taskDetail.subtasks)) {
      if (value.title === "") {
        invalidList.push(key);
      }
    }

    if (invalidList.length === 0) {
      const columnOfTask = activeProjectColumns.find((col) => col.name === taskDetail.status);
      let newTask = {
        ...taskDetail,
        subtasks: Object.values(taskDetail.subtasks),
        column_id: columnOfTask.id,
        project_id: selectedProjectId,
      };
      addTask(newTask);
      setTaskDetail({
        title: "",
        description: "",
        status: defaultStatus,
        subtasks: { subtask1: { title: "", is_completed: false }, subtask2: { title: "", is_completed: false } },
      });
      setInvalidInputList([]);
    } else {
      e.preventDefault();
      setInvalidInputList(invalidList);
    }
  }

  useEffect(() => {
    setTaskDetail((prevValue) => {
      return {
        ...prevValue,
        status: props.status ?? defaultStatus,
      };
    });
  }, [props.status, defaultStatus]);

  return (
    <StyledAddEditTask>
      <h3>Add New Task</h3>
      <label>
        <span>Title</span>
        <InputTextField
          name="title"
          onChange={createNewTask}
          defaultValue={taskDetail.title}
          placeholder="e.g. Take coffee break"
          invalidInputList={invalidInputList}
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
          invalidInputList={invalidInputList}
        ></InputTextField>
      </label>
      <div>
        <span>Subtasks</span>
        <InputContainer
          onChange={createNewTask}
          purpose="task"
          defaultInputs={defaultInputs}
          placeholder={["e.g. Make coffee", "e.g. Drink coffee & smile"]}
          handleAddInputs={handleAddInputs}
          handleRemoveInputs={handleRemoveInputs}
          invalidInputList={invalidInputList}
        ></InputContainer>
      </div>
      <label>
        <span>Status</span>
        <InputDropdown name="status" status={taskDetail.status} onChange={createNewTask}></InputDropdown>
      </label>
      <form method="dialog" onSubmit={handleAddTask}>
        <Button>Create Task</Button>
      </form>
    </StyledAddEditTask>
  );
}
