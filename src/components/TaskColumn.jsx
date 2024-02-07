import styled from "styled-components";
import TaskList from "./TaskList";
import IconCircle from "./IconCircle";
import { useContext } from "react";
import { DataContext } from "../MyContext";

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
    color: #828fa3;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.15rem;
  }
`;

export default function TasksColumn({ name, index, id }) {
  const { taskArray } = useContext(DataContext);
  const tasks = taskArray.filter((task) => task.column_id === id);
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
      <TaskList tasks={tasks}></TaskList>
    </StyledTaskColumn>
  );
}
