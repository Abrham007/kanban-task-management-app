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

  transition: grid-template-area 0.5s;
`;
export default function App() {
  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const style = {
    gridTemplateAreas: `'header header' 'main main'`,
  };

  function handleThemeChange(newTheme) {
    setSelectedTheme(newTheme);
  }

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  return (
    <StyledApp>
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
