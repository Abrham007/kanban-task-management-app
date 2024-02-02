import styled from "styled-components";
import Button from "./Button";
import { devices } from "../utils/devices";
import { useContext } from "react";
import { DataContext } from "../MyContext";

const StyledDeleteMessage = styled.div`
  && h3 {
    color: #ea5555;
  }

  p {
    color: #828fa3;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4375rem;
  }

  div {
    display: flex;
    gap: 16px;
  }

  @media ${devices.mobile} {
    div {
      flex-direction: column;
    }
  }
`;

export default function DeleteMessage({ purpose = "board", title }) {
  const { boardArray, selectedBoard } = useContext(DataContext);
  let activeBoard;
  let message;

  if (purpose === "board") {
    activeBoard = boardArray.find((board) => board.name === selectedBoard);
    message = `Are you sure you want to delete the ‘${activeBoard.name}’ board? This action will remove all columns and tasks
  and cannot be reversed.`;
  } else if (purpose === "task") {
    message = `Are you sure you want to delete the ‘${title}’ task and its subtasks? This action cannot be reversed.`;
  }

  return (
    <StyledDeleteMessage>
      <h3>{purpose === "board" ? "Delete this board?" : "Delete this task?"}</h3>
      <p>{message}</p>
      <div>
        <Button type="destructive">Delete</Button>
        <Button type="secondary">Cancel</Button>
      </div>
    </StyledDeleteMessage>
  );
}
