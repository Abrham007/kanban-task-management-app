import styled from "styled-components";
import InputTextField from "./InputTextField";
import Button from "./Button";
import InputContainer from "./InputContainer";
import { useContext, useState } from "react";
import { DataContext } from "../store/DataContext";

const StyledAddBoard = styled.div`
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

export default function AddBoard() {
  const [projectDetail, setProjectDetail] = useState({
    projectName: "",
    columnNames: { colName1: "Todo", colName2: "Doing" },
  });

  const { addProject } = useContext(DataContext);

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
    let newProject = {
      ...projectDetail,
      columnNames: Object.values(projectDetail.columnNames),
    };
    addProject(newProject);
    setProjectDetail({
      projectName: "",
      columnNames: { colName1: "Todo", colName2: "Doing" },
    });
  }

  return (
    <StyledAddBoard>
      <h3>Add New Board</h3>
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
        <Button onClick={handleAddProject}>Create New Board</Button>
      </form>
    </StyledAddBoard>
  );
}
