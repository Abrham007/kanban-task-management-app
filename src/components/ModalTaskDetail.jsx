import styled from "styled-components";
import InputCheckBox from "./InputCheckBox";
import InputDropdown from "./InputDropdown";
import EllipsisButton from "./EllipsisButton";
import { Modal } from "./ModalStyles.";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const TaskDetail = styled(Modal)`
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

const ModalTaskDetail = forwardRef(function (
  { title, description, status, subtasks, numOfFinishedTasks, statuslist },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <TaskDetail ref={dialog}>
      <TaskDetailHeader>
        <h3>{title}</h3>
        <EllipsisButton purpose={"Task"}></EllipsisButton>
      </TaskDetailHeader>
      <p>{description}</p>
      <TaskDetailCheckbox>
        <span>
          Subtasks ({numOfFinishedTasks} of {subtasks.length})
        </span>
        <div role="presentation">
          {subtasks.map((subtask, index) => (
            <InputCheckBox key={subtask.title} isChecked={subtask.isCompleted}>
              {subtask.title}
            </InputCheckBox>
          ))}
        </div>
      </TaskDetailCheckbox>
      <TaskDetailDropdown>
        <span>Current Status</span>
        <InputDropdown status={status} statuslist={statuslist}></InputDropdown>
      </TaskDetailDropdown>
    </TaskDetail>,
    document.getElementById("modal")
  );
});

export default ModalTaskDetail;
