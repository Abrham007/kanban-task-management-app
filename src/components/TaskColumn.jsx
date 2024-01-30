import styled from "styled-components";
import TaskList from "./TaskList";
import IconCircle from "./IconCircle";

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

export default function TasksColumn({ name, tasks, statuslist, index }) {
  const colorList = ["#49C4E5", "#8471F2", "#67E2AE", "#EA5555"];
  const num = index < 4 ? index : index % 4;
  const color = colorList[num];
  return (
    <StyledTaskColumn>
      <TaskTitle>
        <IconCircle fill={color}></IconCircle>
        <span>
          {name} ({tasks.length})
        </span>
      </TaskTitle>
      <TaskList tasks={tasks} statuslist={statuslist}></TaskList>
    </StyledTaskColumn>
  );
}
