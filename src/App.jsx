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
import { postProjectAndColumn, fetchProjectAndColumnArray } from "./api/client.mjs";

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

  function selectNewProject(newBoard) {
    setAppState((prevValue) => {
      return {
        ...prevValue,
        selectedBoard: newBoard,
      };
    });
  }
  async function addNewProjectAndColumn(project) {
    console.log(project);
    let [newProject, newColumns] = await postProjectAndColumn(project);
    console.log(newProject);
    setAppState((prevValue) => {
      return {
        ...prevValue,
        projectArray: [...prevValue.projectArray, ...newProject],
        columnArray: [...prevValue.columnArray, ...newColumns],
      };
    });
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
    fetchProjectAndColumnArray().then(([projectArray, columnArray]) => {
      setAppState((prevValue) => {
        return {
          ...prevValue,
          selectedProjectId: projectArray.length !== 0 ? projectArray[0].id : null,
          projectArray: [...projectArray],
          columnArray: [...columnArray],
        };
      });
    });
  }, []);

  return (
    <StyledApp $isSideBarHidden={isSideBarHidden}>
      <DataContext.Provider value={{ ...appState, selectNewProject, addNewProjectAndColumn }}>
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
