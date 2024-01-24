import Header from "./components/Header";
import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./theme/GlobalStyles";
import { useTheme } from "./theme/useTheme";
import Board from "./components/Board";
import Main from "./components/Main";

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 96px 1fr;
  grid-template-areas:
    "header header"
    "board main";
  grid-template-areas: ${({ $isBoardHidden }) =>
    $isBoardHidden ? `'header header' 'main main'` : `'header header' 'board main'`};
  transition: all 0.5s linear;
`;
export default function App() {
  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  function handleThemeChange(newTheme) {
    setSelectedTheme(newTheme);
  }

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  return (
    <StyledApp $isBoardHidden={false}>
      {themeLoaded && (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyles></GlobalStyles>
          <Header></Header>
          <Board handleThemeChange={handleThemeChange}></Board>
          <Main></Main>
        </ThemeProvider>
      )}
    </StyledApp>
  );
}
