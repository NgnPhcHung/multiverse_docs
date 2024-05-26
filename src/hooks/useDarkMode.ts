import { useLayoutEffect, useState } from "react";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    setIsDarkMode(localStorage.theme === "dark" || false);
  }, []);
  return { isDarkMode,  setIsDarkMode };
};
