import styled from "styled-components";
import TaskColumn from "./TaskColumn";

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
  const statusList = activeBoard.columns.map((column) => column.name);
  return (
    <StyledTaskBoard>
      {activeBoard.columns.map((column) => (
        <TaskColumn key={column.name} {...column} statuslist={statusList}></TaskColumn>
      ))}
      <NewTaskColumn>
        <button>+ New Column</button>
      </NewTaskColumn>
    </StyledTaskBoard>
  );
}
