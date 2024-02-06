import styled from "styled-components";
import Button from "./Button";
import { devices } from "../utils/devices";
import { useContext } from "react";
import { DataContext } from "../MyContext";

const StyledDeleteMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  && h3 {
    color: #ea5555;
  }

  p {
    color: #828fa3;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4375rem;
  }

  form {
    display: flex;
    gap: 16px;
  }

  @media ${devices.mobile} {
    form {
      flex-direction: column;
    }
  }
`;

export default function DeleteMessage({ purpose = "board", title }) {
  const { projectArray, selectedProjectId, deleteProject } = useContext(DataContext);
  let activeBoard = projectArray.find((project) => project.id === selectedProjectId);
  let message;
  let destructiveBtnFunction;

  if (purpose === "board") {
    activeBoard = projectArray.find((project) => project.id === selectedProjectId);
    message = `Are you sure you want to delete the ‘${activeBoard.name}’ board? This action will remove all columns and tasks
  and cannot be reversed.`;
    destructiveBtnFunction = () => deleteProject(activeBoard.id);
  } else if (purpose === "task") {
    message = `Are you sure you want to delete the ‘${title}’ task and its subtasks? This action cannot be reversed.`;
  }

  return (
    <StyledDeleteMessage>
      <h3>{purpose === "board" ? "Delete this board?" : "Delete this task?"}</h3>
      <p>{message}</p>

      <form method="dialog">
        <Button type="destructive" onClick={destructiveBtnFunction}>
          Delete
        </Button>
        <Button type="secondary">Cancel</Button>
      </form>
    </StyledDeleteMessage>
  );
}
