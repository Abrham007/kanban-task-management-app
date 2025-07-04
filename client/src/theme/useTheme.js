import { useEffect, useState } from "react";
import { setToLS, getFromLS } from "../utils/storage";

export const useTheme = () => {
  const themes = getFromLS("all-themes");
  const [theme, setTheme] = useState(themes.data.light);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = (mode) => {
    setToLS("theme", { theme: mode });
    setTheme(mode);
  };

  useEffect(() => {
    const localTheme = getFromLS("theme");
    localTheme?.theme
      ? setTheme(localTheme.theme)
      : setTheme(themes.data.light);
    setThemeLoaded(true);
  }, [themes.data.light]);

  return { theme, themeLoaded, setMode };
};
