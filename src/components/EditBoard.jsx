import styled from "styled-components";
import InputTextField from "./InputTextField";
import Button from "./Button";
import InputContainer from "./InputContainer";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/DataContext";

const StyledEditBoard = styled.div`
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

export default function EditBoard() {
  const { projectArray, columnArray, selectedProjectId, editProject } = useContext(DataContext);
  const activeBoard = projectArray.find((project) => project.id === selectedProjectId);
  const activeBoardColumns = columnArray.filter((col) => col.project_id === activeBoard.id);
  let newColumnNames = {};
  console.log(activeBoardColumns);
  activeBoardColumns.forEach((col, index) => {
    let inputName = "colName" + (index + 1);
    newColumnNames[inputName] = { id: col.id, name: col.name };
  });

  const [projectDetail, setProjectDetail] = useState({
    projectName: activeBoard.name,
    columnNames: { ...newColumnNames },
  });

  let defaultInputs = {};

  for (let [key, value] of Object.entries(projectDetail.columnNames)) {
    defaultInputs[key] = value.name;
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
    let colIdList = columnArray.map((col) => col.id);
    let nextColId = Math.max(...colIdList) + 1;
    setProjectDetail((prevValue) => {
      return {
        ...prevValue,
        columnNames: { ...prevValue.columnNames, [name]: { id: nextColId, name: "" } },
      };
    });
  }

  function editNewProject(name, value) {
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
          columnNames: { ...prevValue.columnNames, [name]: { id: prevValue.columnNames[name].id, name: value } },
        };
      });
    }
  }

  function handleEditProject() {
    editProject(selectedProjectId, projectDetail);
  }

  return (
    <StyledEditBoard>
      <h3>Edit Board</h3>
      <label>
        <span>Name</span>
        <InputTextField
          onChange={editNewProject}
          name="projectName"
          defaultValue={projectDetail.projectName}
          placeholder="e.g. Web Design"
        ></InputTextField>
      </label>
      <label>
        <span>Columns</span>
        <InputContainer
          onChange={editNewProject}
          defaultInputs={defaultInputs}
          handleAddInputs={handleAddInputs}
          handleRemoveInputs={handleRemoveInputs}
        ></InputContainer>
      </label>
      <form method="dialog">
        <Button onClick={handleEditProject}>Edit Board</Button>
      </form>
    </StyledEditBoard>
  );
}
