import Header from "./components/Header";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./theme/GlobalStyles";
import { useTheme } from "./theme/useTheme";
import Board from "./components/Board";
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
    <>
      {themeLoaded && (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyles></GlobalStyles>
          <Header></Header>
          <Board handleThemeChange={handleThemeChange}></Board>
          <main></main>
        </ThemeProvider>
      )}
    </>
  );
}
