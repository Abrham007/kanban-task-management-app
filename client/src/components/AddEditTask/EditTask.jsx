import styled from "styled-components";
import InputTextField from "../UI/Inputs/InputTextField";
import Button from "../UI/Buttons/Button";
import InputDropdown from "../UI/Inputs/InputDropdown";
import InputContainer from "../UI/Inputs/InputContainer";
import { useContext, useState } from "react";
import { DataContext } from "../../store/DataContext";

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default function EditTask(props) {
  const {
    projectArray,
    columnArray,
    subtaskArray,
    selectedProjectId,
    editTask,
    isLoading,
  } = useContext(DataContext);
  const activeProject = projectArray.find(
    (project) => project.id === selectedProjectId
  );
  const activeProjectColumns = columnArray.filter(
    (col) => col.project_id === activeProject.id
  );
  const activeSubtasks = subtaskArray.filter(
    (subtask) => subtask.task_id === props.id
  );
  let newSubtasks = {};
  activeSubtasks.forEach((subtask, index) => {
    let name = "subtask" + (index + 1);
    newSubtasks[name] = {
      id: subtask.id,
      title: subtask.title,
      is_completed: subtask.is_completed,
      task_id: subtask.task_id,
      column_id: subtask.column_id,
      project_id: subtask.project_id,
    };
  });
  const [taskDetail, setTaskDetail] = useState({
    title: props.title,
    description: props.description,
    status: props.status,
    subtasks: newSubtasks,
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
        subtasks: {
          ...prevValue.subtasks,
          [name]: { title: "", is_completed: false },
        },
      };
    });
  }

  function createNewTask(name, value) {
    let subtaskPattern = /subtask/;
    if (subtaskPattern.test(name)) {
      setTaskDetail((prevValue) => {
        return {
          ...prevValue,
          subtasks: {
            ...prevValue.subtasks,
            [name]: {
              id: prevValue.subtasks[name].id,
              title: value,
              is_completed: prevValue.subtasks[name].is_completed,
            },
          },
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

  async function handleEditTask(e) {
    e.preventDefault();
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
      const columnOfTask = activeProjectColumns.find(
        (col) => col.name === taskDetail.status
      );
      let newTask = {
        ...taskDetail,
        subtasks: Object.values(taskDetail.subtasks),
        column_id: columnOfTask.id,
        project_id: selectedProjectId,
      };
      await editTask(props.id, newTask);
      setInvalidInputList([]);
      props.setIsOpen(false);
    } else {
      setInvalidInputList(invalidList);
    }
  }

  return (
    <StyledAddEditTask>
      <h3>Edit Task</h3>
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
        <InputDropdown
          name="status"
          status={taskDetail.status}
          onChange={createNewTask}
        ></InputDropdown>
      </label>
      <Form method="dialog">
        <Button onClick={handleEditTask} disable={`${isLoading?.editTask}`}>
          {isLoading?.editTask ? "Sending..." : "Edit Task"}
        </Button>
        <Button>Cancel</Button>
      </Form>
    </StyledAddEditTask>
  );
}
