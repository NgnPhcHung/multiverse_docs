import { AnimatePresence } from "framer-motion";
import { AnimatedRoutes } from "pages";
import { useLayoutEffect } from "react";
import { Toaster } from "sonner";

const App = () => {
  useLayoutEffect(() => {
    const mode = localStorage.theme === "light" ? "light" : "dark";
    document.documentElement.classList.add(mode);
    localStorage.theme = mode;
    document.documentElement.setAttribute("data-theme", mode);
  }, []);

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
