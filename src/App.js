import "./App.css";
import Header from "./components/Header";
import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./theme/GlobalStyles";
import { useTheme } from "./theme/useTheme";
export default function App() {
  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);
  return (
    <>
      {themeLoaded && (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyles></GlobalStyles>
          <Header></Header>
          <menu></menu>
          <main></main>
        </ThemeProvider>
      )}
    </>
  );
}
