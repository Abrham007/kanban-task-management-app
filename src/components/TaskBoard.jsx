import styled from "styled-components";
import TaskColumn from "./TaskColumn";
import { useContext } from "react";
import { DataContext } from "../MyContext";

const StyledTaskBoard = styled.div`
  display: flex;
  gap: 24px;
`;

export const NewTaskColumn = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  flex-shrink: 0;
  border-radius: 6px;
  margin-top: 39px;

  button {
    background-color: transparent;
    border: none;
    outline: none;
    color: inherit;
    font-size: 1.5rem;
    font-weight: 700;
  }

  button:hover {
    color: #635fc7;
  }
`;
export default function TaskBoard({ activeBoard }) {
  const { projectArray, columnArray, selectedProjectId } = useContext(DataContext);
  activeBoard = projectArray.find((project) => project.id === selectedProjectId);
  const selectedColumn = columnArray.filter((col) => col.project_id === activeBoard.id);
  return (
    <StyledTaskBoard>
      {selectedColumn.map((column, index) => (
        <TaskColumn key={column.name} index={index} {...column}></TaskColumn>
      ))}
      <NewTaskColumn>
        <button>+ New Column</button>
      </NewTaskColumn>
    </StyledTaskBoard>
  );
}
