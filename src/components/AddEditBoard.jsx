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
  const [projectDetail, setBoardDetail] = useState({
    projectName: "",
    columnNames: { colName1: "Todo", colName2: "Doing" },
  });
  const { projectArray, columnArray, selectedProjectId, addNewProjectAndColumn } = useContext(DataContext);

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
    let name = "colName" + (Object.keys(projectDetail.columnNames).length + 1);
    setBoardDetail((prevValue) => {
      return {
        ...prevValue,
        columnNames: { ...prevValue.columnNames, [name]: "" },
      };
    });
  }

  function createNewBoard(name, value) {
    let columnPattern = /colName/;
    if (name === "projectName") {
      setBoardDetail((prevValue) => {
        return {
          ...prevValue,
          projectName: value,
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
    addNewProjectAndColumn(projectDetail);
  }

  useEffect(() => {
    if (isEdit && projectArray.length !== 0) {
      const activeBoard = projectArray.find((project) => project.id === selectedProjectId);
      const activeBoardColumns = columnArray.filter((col) => col.project_id === activeBoard.id);
      let newColumnNames = {};
      activeBoardColumns.forEach((col, index) => {
        let name = "colName" + (index + 1);
        newColumnNames[name] = col.name;
      });

      setBoardDetail((prevValue) => {
        return {
          ...prevValue,
          projectName: activeBoard.name,
          columnNames: { ...newColumnNames },
        };
      });
    }
  }, [isEdit, selectedProjectId, projectArray, columnArray]);

  return (
    <StyledAddEditBoard>
      <h3>Add New Board</h3>
      <div>
        <label>Name</label>
        <InputTextField
          onChange={createNewBoard}
          name="projectName"
          defaultValue={projectDetail.projectName}
          placeholder="e.g. Web Design"
        ></InputTextField>
      </div>
      <div>
        <label>Columns</label>
        <InputContainer
          onChange={createNewBoard}
          name="columnNames"
          defaultInputs={projectDetail.columnNames}
          handleAddInputs={handleAddInputs}
          handleRemoveInputs={handleRemoveInputs}
        ></InputContainer>
      </div>
      <Button onClick={handleAddBoard}>Create New Board</Button>
    </StyledAddEditBoard>
  );
}
