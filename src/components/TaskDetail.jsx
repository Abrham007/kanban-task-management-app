import styled from "styled-components";
import InputCheckBox from "./InputCheckBox";
import InputDropdown from "./InputDropdown";
import EllipsisButton from "./EllipsisButton";
import AddEditTask from "./AddEditTask";
import DeleteMessage from "./DeleteMessage";
import Modal from "./Modal";
import { DataContext } from "../store/DataContext";

import { devices } from "../utils/devices";
import { forwardRef, useImperativeHandle, useContext, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

export const StyledTaskDetail = styled.dialog`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  height: max-content;
  border-radius: 6px;
  border: none;
  outline: none;
  padding: 32px;
  overflow: visible;

  &::backdrop {
    opacity: 0.5;
    background: #000;
  }

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

  & > p {
    color: #828fa3;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4375rem;
  }

  @media ${devices.mobile} {
    width: 343px;
    padding: 24px;
  }
`;

const TaskDetailHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  justify-content: space-between;
`;

const TaskDetailCheckbox = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const TaskDetailDropdown = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TaskDetail = forwardRef(function TaskDetail(props, ref) {
  const [taskDetail, setTaskDetail] = useState({
    subtasks: props.activeSubtaskList,
    status: props.status,
  });
  const { projectArray, columnArray, selectedProjectId, editDetail } = useContext(DataContext);
  const activeProject = projectArray.find((project) => project.id === selectedProjectId);
  const activeProjectColumns = columnArray.filter((col) => col.project_id === activeProject.id);
  let numOfFinishedTasks = taskDetail.subtasks.filter((subtask) => subtask.is_completed === true).length;

  const editDialog = useRef();
  const deleteDialog = useRef();
  const taskDetaildialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        taskDetaildialog.current.showModal();
      },
    };
  });

  function handleEditModalOpen() {
    editDialog.current.open();
  }

  function handleDeleteModalOpen() {
    deleteDialog.current.open();
  }

  function handleStatusChange(name, value) {
    setTaskDetail((prevValue) => {
      return {
        ...prevValue,
        status: value,
      };
    });
  }

  function handleSubtaskChange(id) {
    setTaskDetail((prevValue) => {
      let tempSubtasks = [...prevValue.subtasks];
      let currentSubtaskIndex = tempSubtasks.findIndex((subTask) => subTask.id === id);
      let currentSubtask = tempSubtasks[currentSubtaskIndex];
      let newSubtask;
      if (currentSubtask.is_completed) {
        newSubtask = { ...currentSubtask, is_completed: false };
      } else {
        newSubtask = { ...currentSubtask, is_completed: true };
      }
      tempSubtasks[currentSubtaskIndex] = newSubtask;

      return {
        ...prevValue,
        subtasks: tempSubtasks,
      };
    });
  }

  function handleTaskDetailClose() {
    const columnOfTask = activeProjectColumns.find((col) => col.name === taskDetail.status);

    let detail = {
      ...taskDetail,
      task_id: props.id,
      column_id: columnOfTask.id,
    };
    editDetail(detail);
  }

  useEffect(() => {
    setTaskDetail({
      subtasks: props.activeSubtaskList,
      status: props.status,
    });
  }, [props.status, props.activeSubtaskList]);

  return (
    <>
      <StyledTaskDetail ref={taskDetaildialog} onClose={handleTaskDetailClose}>
        <TaskDetailHeader>
          <h3>{props.title}</h3>
          <EllipsisButton
            handleEdit={handleEditModalOpen}
            handleDelete={handleDeleteModalOpen}
            purpose={"Task"}
          ></EllipsisButton>
        </TaskDetailHeader>
        <p>{props.description}</p>
        <TaskDetailCheckbox>
          <span>
            Subtasks ({numOfFinishedTasks} of {taskDetail.subtasks.length})
          </span>
          <div role="presentation">
            {taskDetail.subtasks.map((subtask) => (
              <InputCheckBox
                key={subtask.id}
                id={subtask.id}
                isChecked={subtask.is_completed}
                onChange={handleSubtaskChange}
              >
                {subtask.title}
              </InputCheckBox>
            ))}
          </div>
        </TaskDetailCheckbox>
        <TaskDetailDropdown>
          <span>Current Status</span>
          <InputDropdown status={taskDetail.status} name="status" onChange={handleStatusChange}></InputDropdown>
        </TaskDetailDropdown>
      </StyledTaskDetail>
      <Modal ref={editDialog}>
        <AddEditTask isEdit={true} {...props}></AddEditTask>
      </Modal>
      <Modal ref={deleteDialog}>
        <DeleteMessage purpose="task" title={props.title} task_id={props.id}></DeleteMessage>
      </Modal>
    </>
  );
});

export default TaskDetail;
