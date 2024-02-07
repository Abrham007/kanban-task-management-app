import styled from "styled-components";
import InputTextField from "./InputTextField";
import Button from "./Button";
import InputContainer from "./InputContainer";
import { useContext, useEffect, useState } from "react";
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

  span {
    font-size: 0.75rem;
    font-weight: 700;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export default function AddEditBoard({ isEdit }) {
  const [projectDetail, setProjectDetail] = useState({
    projectName: "",
    columnNames: { colName1: "Todo", colName2: "Doing" },
  });
  const { projectArray, columnArray, selectedProjectId, addProject, editProject } = useContext(DataContext);
  let titleText = "Add New Board";
  let btnText = "Create New Board";
  let btnFunction = handleAddProject;

  if (isEdit) {
    titleText = "Edit Board";
    btnText = "Edit Board";
    btnFunction = handleEditProject;
  }

  function handleRemoveInputs(name) {
    setProjectDetail((prevValue) => {
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
    setProjectDetail((prevValue) => {
      return {
        ...prevValue,
        columnNames: { ...prevValue.columnNames, [name]: "" },
      };
    });
  }

  function createNewProject(name, value) {
    let columnPattern = /colName/;
    if (name === "projectName") {
      setProjectDetail((prevValue) => {
        return {
          ...prevValue,
          projectName: value,
        };
      });
    } else if (columnPattern.test(name)) {
      setProjectDetail((prevValue) => {
        return {
          ...prevValue,
          columnNames: { ...prevValue.columnNames, [name]: value },
        };
      });
    }
  }
  function handleAddProject() {
    addProject(projectDetail);
    setProjectDetail({
      projectName: "",
      columnNames: { colName1: "Todo", colName2: "Doing" },
    });
  }

  function handleEditProject() {
    editProject(selectedProjectId, projectDetail);
    setProjectDetail({
      projectName: "",
      columnNames: { colName1: "Todo", colName2: "Doing" },
    });
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

      setProjectDetail((prevValue) => {
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
      <h3>{titleText}</h3>
      <label>
        <span>Name</span>
        <InputTextField
          onChange={createNewProject}
          name="projectName"
          defaultValue={projectDetail.projectName}
          placeholder="e.g. Web Design"
        ></InputTextField>
      </label>
      <label>
        <span>Columns</span>
        <InputContainer
          onChange={createNewProject}
          defaultInputs={projectDetail.columnNames}
          handleAddInputs={handleAddInputs}
          handleRemoveInputs={handleRemoveInputs}
        ></InputContainer>
      </label>
      <form method="dialog">
        <Button onClick={btnFunction}>{btnText}</Button>
      </form>
    </StyledAddEditBoard>
  );
}
