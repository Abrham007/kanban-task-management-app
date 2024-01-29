import styled from "styled-components";
import ModalTaskDetail from "./ModalTaskDetail";
import { useRef } from "react";

export const StyledTask = styled.button`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px 0px rgba(54, 78, 126, 0.1);
  padding: 23px 16px;
  border: none;
  outline: none;
  color: inherit;
  text-align: left;

  &:focus,
  &:hover h3 {
    color: #635fc7;
  }

  h3 {
    color: inherit;
    font-size: 0.9375rem;
    font-weight: 700;
  }

  p {
    color: #828fa3;
    font-size: 0.75rem;
    font-weight: 700;
  }
`;

export default function Task(props) {
  const taskModal = useRef();
  const numOfFinishedTasks = props.subtasks.filter((subtask) => subtask.isCompleted).length;

  function openModal() {
    taskModal.current.open();
  }
  return (
    <>
      <StyledTask onClick={openModal}>
        <h3>{props.title}</h3>
        <p>
          {numOfFinishedTasks} of {props.subtasks.length} substasks
        </p>
      </StyledTask>
      <ModalTaskDetail ref={taskModal} {...props} numOfFinishedTasks={numOfFinishedTasks}></ModalTaskDetail>
    </>
  );
}
