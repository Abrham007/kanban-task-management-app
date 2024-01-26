import Header from "./components/Header";
import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./theme/GlobalStyles";
import { useTheme } from "./theme/useTheme";
import Board from "./components/Board";
import Main from "./components/Main";
import { devices } from "./utils/devices";
import { MyContext } from "./MyContext";
import TaskDetali from "./components/TaskDetail";

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  gap: 1px;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 96px 1fr;
  grid-template-areas:
    "header header"
    "board main";
  grid-template-areas: ${({ $isBoardHidden }) =>
    $isBoardHidden ? `'header header' 'main main'` : `'header header' 'board main'`};
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
  const [isBoardHidden, setisBoardHidden] = useState(false);

  function handleThemeChange(newTheme) {
    setSelectedTheme(newTheme);
  }

  function handleBoardHidden() {
    setisBoardHidden((prevValue) => !prevValue);
  }

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  return (
    <StyledApp $isBoardHidden={isBoardHidden}>
      <TaskDetali></TaskDetali>
      <MyContext.Provider value={{ isBoardHidden, handleBoardHidden }}>
        {themeLoaded && (
          <ThemeProvider theme={selectedTheme}>
            <GlobalStyles></GlobalStyles>
            <Header></Header>
            <Board handleThemeChange={handleThemeChange}></Board>
            <Main></Main>
          </ThemeProvider>
        )}
      </MyContext.Provider>
    </StyledApp>
  );
}
