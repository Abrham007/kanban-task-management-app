import styled from "styled-components";
import InputTextField from "./InputTextField";
import Button from "./Button";
import InputContainer from "./InputContainer";
import { useContext, useEffect, useState, useSyncExternalStore } from "react";
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
  const [boardDetail, setBoardDetail] = useState({
    boardName: "",
    columnNames: { colName1: "Todo", colName2: "Doing" },
  });
  const { boardArray, selectedBoard, addNewBoard } = useContext(DataContext);

  if (isEdit && boardArray.length !== 0) {
    const activeBoard = boardArray.find((board) => board.name === selectedBoard);

    setBoardDetail((prevValue) => {
      return {
        ...prevValue,
        boardName: activeBoard.name,
        columnNames: activeBoard.columns.map((col) => col.name),
      };
    });
  }

  function handleRemoveInputs(name) {
    setBoardDetail((prevValue) => {
      let tempColList = { ...prevValue.columnNames };
      delete tempColList[name];
      return {
        ...prevValue,
        columnNames: tempColList,
      };
    });
  }

  function handleAddInputs() {
    let name = "colName" + (Object.keys(boardDetail.columnNames).length + 1);
    setBoardDetail((prevValue) => {
      return {
        ...prevValue,
        columnNames: { ...prevValue.columnNames, [name]: "" },
      };
    });
  }

  function createNewBoard(name, value) {
    let columnPattern = /colName/;
    if (name === "boardName") {
      setBoardDetail((prevValue) => {
        return {
          ...prevValue,
          boardName: value,
        };
      });
    } else if (columnPattern.test(name)) {
      setBoardDetail((prevValue) => {
        return {
          ...prevValue,
          columnNames: { ...prevValue.columnNames, [name]: value },
        };
      });
    }
  }
  function handleAddBoard() {
    addNewBoard(boardDetail);
  }

  return (
    <StyledAddEditBoard>
      <h3>Add New Board</h3>
      <div>
        <label>Name</label>
        <InputTextField
          onChange={createNewBoard}
          name="boardName"
          defaultValue={boardDetail.boardName}
          placeholder="e.g. Web Design"
        ></InputTextField>
      </div>
      <div>
        <label>Columns</label>
        <InputContainer
          onChange={createNewBoard}
          name="columnNames"
          defaultInputs={boardDetail.columnNames}
          handleAddInputs={handleAddInputs}
          handleRemoveInputs={handleRemoveInputs}
        ></InputContainer>
      </div>
      <Button onClick={handleAddBoard}>Create New Board</Button>
    </StyledAddEditBoard>
  );
}
