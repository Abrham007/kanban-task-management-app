import styled from "styled-components";
import InputTextField from "./InputTextField";
import Button from "./Button";
import InputContainer from "./InputContainer";
import { useContext, useEffect } from "react";
import { DataContext } from "../MyContext";

const StyledAddEditBoard = styled.div`
  width: 100%;

  & > * {
    margin-bottom: 24px;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
  }

  label {
    font-size: 0.75rem;
    font-weight: 700;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export default function AddEditBoard({ isEdit }) {
  const { boardArray, selectedBoard } = useContext(DataContext);
  let defaultColumnNames = ["Todo", "Doing"];
  let title = "";

  if (isEdit && boardArray.length !== 0) {
    const activeBoard = boardArray.find((board) => board.name === selectedBoard);
    defaultColumnNames = activeBoard.columns.map((col) => col.name);
    title = selectedBoard;
  }

  return (
    <StyledAddEditBoard>
      <h3>Add New Board</h3>
      <div>
        <label>Name</label>
        <InputTextField defaultValue={title} placeholder="e.g. Web Design"></InputTextField>
      </div>
      <div>
        <label>Columns</label>
        <InputContainer defaultInputs={defaultColumnNames}></InputContainer>
      </div>
      <Button>Create New Board</Button>
    </StyledAddEditBoard>
  );
}
