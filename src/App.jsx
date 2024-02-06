import Header from "./components/Header";
import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./theme/GlobalStyles";
import { useTheme } from "./theme/useTheme";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import { devices } from "./utils/devices";
import { SideBarContext, DataContext } from "./MyContext";
import data from "./data.json";
import { fetchProject, postProject, removeProject, updateProject, fetchTask, postTask } from "./api/client.mjs";

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  gap: 1px;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 96px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-areas: ${({ $isSideBarHidden }) =>
    $isSideBarHidden ? `'header header' 'main main'` : `'header header' 'sidebar main'`};
  transition: all 0.5s linear;

  @media ${devices.tablet} {
    grid-template-columns: 260px 1fr;
    grid-template-rows: 80px 1fr;
  }

  @media ${devices.mobile} {
    grid-template-columns: 1fr;
    grid-template-rows: 64px 1fr;
    grid-template-areas:
      "header header"
      "main main";
  }
`;
export default function App() {
  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [isSideBarHidden, setisSideBarHidden] = useState(false);
  const [appState, setAppState] = useState({
    selectedProjectId: null,
    projectArray: [],
    columnArray: [],
    taskArray: [],
    subtaskArray: [],
  });

  function selectNewProject(newProjectId) {
    setAppState((prevValue) => {
      return {
        ...prevValue,
        selectedProjectId: newProjectId,
      };
    });
  }
  async function addProject(project) {
    let [newProjecArray, newColumnArray] = await postProject(project);

    if (newProjecArray && newColumnArray) {
      setAppState((prevValue) => {
        return {
          ...prevValue,
          projectArray: [...prevValue.projectArray, ...newProjecArray],
          columnArray: [...prevValue.columnArray, ...newColumnArray],
        };
      });
    }
  }

  async function deleteProject(id) {
    let response = await removeProject(id);

    if (response[0].id === id) {
      setAppState((prevValue) => {
        return {
          ...prevValue,
          selectedProjectId: prevValue.projectArray.length !== 0 ? prevValue.projectArray[0].id : null,
          projectArray: [...prevValue.projectArray].filter((project) => project.id !== id),
          columnArray: [...prevValue.columnArray].filter((col) => col.project_id !== id),
        };
      });
    }
  }

  async function editProject(id, project) {
    console.log(project);
    let [updatedProject, updatedColumnArray] = await updateProject(id, project);

    if (updateProject && updatedColumnArray) {
      setAppState((prevValue) => {
        let tempProject = [...prevValue.projectArray];
        let tempColumn = [...prevValue.columnArray].filter((col) => col.project_id !== id);
        let tempProjectIndex = tempProject.findIndex((project) => project.id === id);
        tempProject[tempProjectIndex] = updatedProject[0];
        console.log(tempProject);
        return {
          ...prevValue,
          projectArray: tempProject,
          columnArray: [...tempColumn, ...updatedColumnArray],
        };
      });
    }
  }

  async function addTask(task) {
    let [newTaskArray, newSubtaskArray] = await postTask(task);

    if (newTaskArray && newSubtaskArray) {
      setAppState((prevValue) => {
        return {
          ...prevValue,
          taskArray: [...newTaskArray],
          subtaskArray: [...newSubtaskArray],
        };
      });
    }
  }

  function handleThemeChange(newTheme) {
    setSelectedTheme(newTheme);
  }

  function handleSideBarHidden() {
    setisSideBarHidden((prevValue) => !prevValue);
  }

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  useEffect(() => {
    fetchProject().then(([projectArray, columnArray]) => {
      setAppState((prevValue) => {
        return {
          ...prevValue,
          selectedProjectId: projectArray.length !== 0 ? projectArray[0].id : null,
          projectArray: [...projectArray],
          columnArray: [...columnArray],
        };
      });
    });
    fetchTask().then(([taskArray, subtaskArray]) => {
      setAppState((prevValue) => {
        return {
          ...prevValue,
          taskArray: [...taskArray],
          subtaskArray: [...subtaskArray],
        };
      });
    });
  }, []);

  return (
    <StyledApp $isSideBarHidden={isSideBarHidden}>
      <DataContext.Provider value={{ ...appState, selectNewProject, addProject, deleteProject, editProject, addTask }}>
        <SideBarContext.Provider value={{ isSideBarHidden, handleSideBarHidden }}>
          {themeLoaded && (
            <ThemeProvider theme={selectedTheme}>
              <GlobalStyles></GlobalStyles>
              <Header></Header>
              <SideBar handleThemeChange={handleThemeChange}></SideBar>
              <Main></Main>
            </ThemeProvider>
          )}
        </SideBarContext.Provider>
      </DataContext.Provider>
    </StyledApp>
  );
}
