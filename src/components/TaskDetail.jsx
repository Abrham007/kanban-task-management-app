import styled from "styled-components";
import InputCheckBox from "./InputCheckBox";
import InputDropdown from "./InputDropdown";
import EllipsisButton from "./EllipsisButton";
import AddEditTask from "./AddEditTask";
import DeleteMessage from "./DeleteMessage";
import Modal from "./Modal";
import { useRef } from "react";

const StyledTaskDetail = styled.div`
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

  & > p {
    color: #828fa3;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4375rem;
  }
`;

const TaskDetailHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  justify-content: space-between;
`;

const TaskDetailCheckbox = styled.div`
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

const TaskDetailDropdown = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default function TaskDetail(props) {
  const editDialog = useRef();
  const deleteDialog = useRef();

  function handleEditModalOpen() {
    editDialog.current.open();
  }

  function handleDeleteModalOpen() {
    deleteDialog.current.open();
  }
  return (
    <>
      <StyledTaskDetail>
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
          <label>
            Subtasks ({props.numOfFinishedTasks} of {props.subtasks.length})
          </label>
          <div role="presentation">
            {props.subtasks.map((subtask) => (
              <InputCheckBox key={subtask.title} isChecked={subtask.isCompleted}>
                {subtask.title}
              </InputCheckBox>
            ))}
          </div>
        </TaskDetailCheckbox>
        <TaskDetailDropdown>
          <label>Current Status</label>
          <InputDropdown status={props.status}></InputDropdown>
        </TaskDetailDropdown>
      </StyledTaskDetail>
      <Modal ref={editDialog}>
        <AddEditTask isEdit={true} {...props}></AddEditTask>
      </Modal>
      <Modal ref={deleteDialog}>
        <DeleteMessage purpose="Task" title={props.title}></DeleteMessage>
      </Modal>
    </>
  );
}
