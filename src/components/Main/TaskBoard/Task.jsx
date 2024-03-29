import styled from "styled-components";
import TaskDetail from "./TaskDetail";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../../store/DataContext";

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
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { subtaskArray } = useContext(DataContext);
  const activeSubtaskList = subtaskArray.filter(
    (subtask) => subtask.task_id === props.id
  );
  const numOfFinishedTasks = activeSubtaskList.filter(
    (subtask) => subtask.is_completed
  ).length;

  function handleOpenModal() {
    setIsDetailOpen(true);
  }

  function handleCloseModal() {
    setIsDetailOpen(false);
  }
  return (
    <>
      <StyledTask onClick={handleOpenModal}>
        <h3>{props.title}</h3>
        <p>
          {numOfFinishedTasks} of {activeSubtaskList.length} substasks
        </p>
      </StyledTask>

      {isDetailOpen && (
        <TaskDetail
          {...props}
          isDetailOpen={isDetailOpen}
          handleCloseModal={handleCloseModal}
          numOfFinishedTasks={numOfFinishedTasks}
          activeSubtaskList={activeSubtaskList}
        ></TaskDetail>
      )}
    </>
  );
}
