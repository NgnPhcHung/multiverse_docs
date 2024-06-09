import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.theme === "dark"
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "theme") {
        const isDark = event.newValue === "dark";
        console.log({ isDark });
        setIsDarkMode(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
        setIsDarkMode(isDark);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isDarkMode]);

  return { isDarkMode, setIsDarkMode };
};
