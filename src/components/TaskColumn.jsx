import styled from "styled-components";
import TaskList from "./TaskList";

const StyledTaskColumn = styled.section`
  flex-shrink: 0;
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TaskTitle = styled.h2`
  display: flex;
  gap: 12px;

  span {
    color: inherit;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.15rem;
  }
`;

export default function TasksColumn() {
  return (
    <StyledTaskColumn>
      <TaskTitle>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle cx="7.5" cy="7.5" r="7.5" fill="#49C4E5" />
        </svg>
        <span>TODO (4)</span>
      </TaskTitle>
      <TaskList></TaskList>
    </StyledTaskColumn>
  );
}
