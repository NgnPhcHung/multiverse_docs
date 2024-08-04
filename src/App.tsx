import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { AnimatedRoutes } from "./AnimatedRoutes";

const App = () => {


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
