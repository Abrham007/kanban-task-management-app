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

  label,
  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default function AddBoard() {
  const [projectDetail, setProjectDetail] = useState({
    projectName: "",
    columnNames: { colName1: "Todo", colName2: "Doing" },
  });

  const [invalidInputList, setInvalidInputList] = useState([]);

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

  function handleAddProject(e) {
    let invalidList = [];
    if (projectDetail.projectName === "") {
      invalidList.push("projectName");
    }

    for (let [key, value] of Object.entries(projectDetail.columnNames)) {
      if (value === "") {
        invalidList.push(key);
      }
    }

    if (invalidList.length === 0) {
      console.log(invalidInputList);
      let newProject = {
        ...projectDetail,
        columnNames: Object.values(projectDetail.columnNames),
      };
      addProject(newProject);
      setProjectDetail({
        projectName: "",
        columnNames: { colName1: "Todo", colName2: "Doing" },
      });
      setInvalidInputList([]);
    } else {
      e.preventDefault();
      setInvalidInputList(invalidList);
    }
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
          invalidInputList={invalidInputList}
        ></InputTextField>
      </label>
      <div>
        <span>Columns</span>
        <InputContainer
          onChange={createNewProject}
          defaultInputs={projectDetail.columnNames}
          handleAddInputs={handleAddInputs}
          handleRemoveInputs={handleRemoveInputs}
          invalidInputList={invalidInputList}
        ></InputContainer>
      </div>
      <Form method="dialog">
        <Button onClick={handleAddProject}>Create New Board</Button>
        <Button>Cancel</Button>
      </Form>
    </StyledAddBoard>
  );
}
