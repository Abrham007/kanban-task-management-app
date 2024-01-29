import styled from "styled-components";
import Task from "./Task";

const StyledTaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function TaskList({ tasks, statuslist }) {
  return (
    <StyledTaskList>
      {tasks.map((task) => (
        <Task key={task.title} {...task} statuslist={statuslist}></Task>
      ))}
    </StyledTaskList>
  );
}
