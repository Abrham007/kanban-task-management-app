import styled from "styled-components";
import InputTextField from "./InputTextField";
import Button from "./Button";
import InputContainer from "./InputContainer";
import { useContext, useState } from "react";
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

export default function EditBoard() {
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const {
    projectArray,
    columnArray,
    taskArray,
    selectedProjectId,
    editProject,
    deleteTask,
  } = useContext(DataContext);
  const activeBoard = projectArray.find(
    (project) => project.id === selectedProjectId
  );
  const activeBoardColumns = columnArray.filter(
    (col) => col.project_id === activeBoard.id
  );
  let newColumnNames = {};

  activeBoardColumns.forEach((col, index) => {
    let inputName = "colName" + (index + 1);
    newColumnNames[inputName] = { id: col.id, name: col.name };
  });

  const [projectDetail, setProjectDetail] = useState({
    projectName: activeBoard.name,
    columnNames: { ...newColumnNames },
  });
  const [invalidInputList, setInvalidInputList] = useState([]);

  let defaultInputs = {};

  for (let [key, value] of Object.entries(projectDetail.columnNames)) {
    defaultInputs[key] = value.name;
  }

  async function handleDeleteColumn(taskIdList) {
    setDeleteInProgress(true);
    for await (const taskId of taskIdList) {
      await deleteTask(taskId);
    }
    setDeleteInProgress(false);
  }

  async function handleRemoveInputs(name) {
    let currentColumnId = projectDetail.columnNames[name].id;
    let currentTaskIdList = taskArray
      .filter((task) => task.column_id === currentColumnId)
      .map((task) => task.id);
    if (currentTaskIdList.length === 0) {
      setProjectDetail((prevValue) => {
        let tempColList = { ...prevValue.columnNames };
        delete tempColList[name];
        return {
          ...prevValue,
          columnNames: tempColList,
        };
      });
    } else {
      handleDeleteColumn(currentTaskIdList);
      setProjectDetail((prevValue) => {
        let tempColList = { ...prevValue.columnNames };
        delete tempColList[name];
        return {
          ...prevValue,
          columnNames: tempColList,
        };
      });
    }
  }

  function handleAddInputs() {
    let name = "colName" + (Object.keys(projectDetail.columnNames).length + 1);
    setProjectDetail((prevValue) => {
      return {
        ...prevValue,
        columnNames: { ...prevValue.columnNames, [name]: { name: "" } },
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
          columnNames: {
            ...prevValue.columnNames,
            [name]: { id: prevValue.columnNames[name].id, name: value },
          },
        };
      });
    }
  }

  function handleEditProject(e) {
    let invalidList = [];
    if (projectDetail.projectName === "") {
      invalidList.push("projectName");
    }

    for (let [key, value] of Object.entries(projectDetail.columnNames)) {
      if (value.name === "") {
        invalidList.push(key);
      }
    }

    if (invalidList.length === 0) {
      let newProject = {
        ...projectDetail,
        columnNames: Object.values(projectDetail.columnNames),
      };
      editProject(selectedProjectId, newProject);
      setInvalidInputList([]);
    } else {
      e.preventDefault();
      setInvalidInputList(invalidList);
    }
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
          invalidInputList={invalidInputList}
        ></InputTextField>
      </label>
      <div>
        <span>Columns</span>
        <InputContainer
          onChange={editNewProject}
          defaultInputs={defaultInputs}
          handleAddInputs={handleAddInputs}
          handleRemoveInputs={handleRemoveInputs}
          invalidInputList={invalidInputList}
        ></InputContainer>
      </div>
      <Form method="dialog">
        <Button onClick={handleEditProject} disabled={deleteInProgress}>
          Edit Board
        </Button>
        <Button>Cancel</Button>
      </Form>
    </StyledEditBoard>
  );
}
