import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { AnimatedRoutes } from "./AnimatedRoutes";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    setIsDarkMode(localStorage.theme === "dark");
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Toaster position="bottom-center" />
      <AnimatePresence mode="wait">
        <AnimatedRoutes />
      </AnimatePresence>
    </div>
  );
};

export default App;
