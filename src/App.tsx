import { AnimatedRoutes } from "AnimatedRoutes";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AppContext } from "./AppContext";

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
      <AppContext.Provider
        value={{
          isDarkMode,
          setIsDarkMode,
        }}
      >
        <Toaster position="bottom-center" />
        {/* <AnimatePresence mode="wait">
          <RouterProvider router={routes} />
        </AnimatePresence> */}
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
};

export default App;
