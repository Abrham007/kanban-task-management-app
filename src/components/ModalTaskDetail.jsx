import styled from "styled-components";
import InputCheckBox from "./InputCheckBox";
import InputDropdown from "./InputDropdown";
import EllipsisButton from "./EllipsisButton";
import { Modal } from "./ModalStyles.";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import ModalAddEditTask from "./ModalAddEditTask";
import ModalDelete from "./ModalDelete";

const TaskDetail = styled(Modal)`
  overflow: visible;
  & > p {
    color: #828fa3;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4375rem;
  }
`;

const TaskDetailHeader = styled.div`
  display: flex;
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

const TaskDetailDropdown = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ModalTaskDetail = forwardRef(function (props, ref) {
  const ownDialog = useRef();
  const editDialog = useRef();
  const deleteDialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        ownDialog.current.showModal();
      },
    };
  });

  function handleEditModalOpen() {
    editDialog.current.open();
  }

  function handleDeleteModalOpen() {
    deleteDialog.current.open();
  }
  return createPortal(
    <>
      <TaskDetail ref={ownDialog}>
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
            Subtasks ({props.numOfFinishedTasks} of {props.subtasks.length})
          </span>
          <div role="presentation">
            {props.subtasks.map((subtask) => (
              <InputCheckBox key={subtask.title} isChecked={subtask.isCompleted}>
                {subtask.title}
              </InputCheckBox>
            ))}
          </div>
        </TaskDetailCheckbox>
        <TaskDetailDropdown>
          <span>Current Status</span>
          <InputDropdown status={props.status}></InputDropdown>
        </TaskDetailDropdown>
      </TaskDetail>
      <ModalAddEditTask ref={editDialog} {...props}></ModalAddEditTask>
      <ModalDelete ref={deleteDialog} purpose="Task" title={props.title}></ModalDelete>
    </>,
    document.getElementById("modal")
  );
});

export default ModalTaskDetail;
