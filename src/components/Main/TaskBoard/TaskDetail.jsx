import styled from "styled-components";
import InputCheckBox from "../../UI/Inputs/InputCheckBox";
import InputDropdown from "../../UI/Inputs/InputDropdown";
import EllipsisButton from "../../UI/Buttons/EllipsisButton";
import EditTask from "../../AddEditTask/EditTask";
import DeleteMessage from "../../DeleteMessage";
import Modal from "../../Modal";
import { DataContext } from "../../../store/DataContext";
import { devices } from "../../../utils/devices";
import { useContext, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "../../UI/Buttons/Button";

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
  overflow-y: visible;

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

const Form = styled.form`
  display: flex;
  gap: 8px;
`;

export default function TaskDetail(props) {
  const {
    projectArray,
    columnArray,
    selectedProjectId,
    editTaskDetail,
    isLoading,
  } = useContext(DataContext);
  const [statusState, setStatusState] = useState(props.status);

  let taskDetail = {
    subtasks: props.activeSubtaskList,
    status: statusState,
  };

  const [isAddEditTaskOpen, setAddEditTaskOpen] = useState(false);
  const [isDeleteMessageOpen, setDeleteMessageOpen] = useState(false);

  const activeProject = projectArray.find(
    (project) => project.id === selectedProjectId
  );
  const activeProjectColumns = columnArray.filter(
    (col) => col.project_id === activeProject.id
  );
  let numOfFinishedTasks = taskDetail.subtasks.filter(
    (subtask) => subtask.is_completed === true
  ).length;

  const taskDetaildialog = useRef();

  useEffect(() => {
    if (props.isDetailOpen) {
      taskDetaildialog.current.showModal();
    } else {
      taskDetaildialog.current.close();
    }
  }, [props.isDetailOpen]);

  function handleEditModalOpen() {
    setAddEditTaskOpen(true);
  }

  function handleDeleteModalOpen() {
    setDeleteMessageOpen(true);
  }

  function handleStatusChange(name, value) {
    setStatusState(value);
  }

  function handleSubtaskChange(id) {
    let tempSubtasks = [...taskDetail.subtasks];
    let currentSubtaskIndex = tempSubtasks.findIndex(
      (subTask) => subTask.id === id
    );
    let currentSubtask = tempSubtasks[currentSubtaskIndex];
    let newSubtask;
    if (currentSubtask.is_completed) {
      newSubtask = { ...currentSubtask, is_completed: false };
    } else {
      newSubtask = { ...currentSubtask, is_completed: true };
    }
    tempSubtasks[currentSubtaskIndex] = newSubtask;
    taskDetail.subtasks = tempSubtasks;
  }

  async function handleTaskDetailClose(e) {
    e.preventDefault();
    const columnOfTask = activeProjectColumns.find(
      (col) => col.name === taskDetail.status
    );
    let newSubtask = taskDetail.subtasks.map((subtask) => ({
      ...subtask,
      column_id: columnOfTask.id,
    }));

    let newTaskDetail = {
      status: taskDetail.status,
      subtasks: newSubtask,
      column_id: columnOfTask.id,
    };

    await editTaskDetail(props.id, newTaskDetail);
    props.handleCloseModal();
  }

  return createPortal(
    <>
      <StyledTaskDetail ref={taskDetaildialog} onClose={props.handleCloseModal}>
        <TaskDetailHeader>
          <h3>{props.title}</h3>
          <EllipsisButton
            handleEdit={handleEditModalOpen}
            handleDelete={handleDeleteModalOpen}
            purpose={"Task"}
            aria-label="Menu"
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
          <InputDropdown
            status={taskDetail.status}
            name="status"
            onChange={handleStatusChange}
          ></InputDropdown>
        </TaskDetailDropdown>
        <Form method="dialog">
          <Button
            onClick={handleTaskDetailClose}
            disable={`${isLoading?.editTaskDetail}`}
          >
            {isLoading?.editTaskDetail ? "Saving..." : "Save"}
          </Button>
          <Button>Cancel</Button>
        </Form>
      </StyledTaskDetail>
      <Modal isOpen={isAddEditTaskOpen} setIsOpen={setAddEditTaskOpen}>
        <EditTask
          {...props}
          handleCloseModal={props.handleCloseModal}
          setIsOpen={setAddEditTaskOpen}
        ></EditTask>
      </Modal>
      <Modal isOpen={isDeleteMessageOpen} setIsOpen={setDeleteMessageOpen}>
        <DeleteMessage
          purpose="task"
          title={props.title}
          task_id={props.id}
        ></DeleteMessage>
      </Modal>
    </>,
    document.getElementById("modal")
  );
}
