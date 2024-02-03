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
import { postNewProject } from "./api/client.mjs";

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
    selectedProjectId: 1,
    projectArray: [],
    taskArray: [],
  });

  function selectNewProject(newBoard) {
    setAppState((prevValue) => {
      return {
        ...prevValue,
        selectedBoard: newBoard,
      };
    });
  }
  function addNewProject(newBoard) {
    console.log(newBoard);
    postNewProject(newBoard).then(() => console.log("sent from front"));
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

  // useEffect(() => {
  //   setAppState({
  //     selectedBoard: data.boards[0].name,
  //     boardArray: data.boards,
  //   });
  // }, []);

  return (
    <StyledApp $isSideBarHidden={isSideBarHidden}>
      <DataContext.Provider value={{ ...appState, selectNewProject, addNewProject }}>
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
