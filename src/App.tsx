import { AppLiveBlocksProvider, SocketContext } from "components/providers";
import { TypedLiveblocksProvider } from "config";
import { Suspense, lazy, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AppContext } from "./AppContext";

const DiagramByEditorPage = lazy(() => import("./pages/DiagramByEditorPage"));
const ViewSelectorPage = lazy(() => import("./pages/ViewSelectorPage"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <ViewSelectorPage />
      </Suspense>
    ),
  },
  {
    path: "text-diagram",
    element: (
      <Suspense>
        <DiagramByEditorPage />
      </Suspense>
    ),
  },
]);

const App = () => {
  const roomId = "diagram-script";
  const [room, joinRoom] = useState(roomId);
  const [name, setName] = useState("");
  const [provider, setProvider] = useState<TypedLiveblocksProvider>();
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
    <div className="h-screen w-screen">
      <AppContext.Provider
        value={{
          isDarkMode,
          setIsDarkMode,
        }}
      >
        <SocketContext.Provider
          value={{
            name,
            room,
            provider,
            setProvider,
            setName,
            joinRoom,
          }}
        >
          <Toaster position="bottom-center" />
          <AppLiveBlocksProvider>
            <RouterProvider router={routes} />
          </AppLiveBlocksProvider>
        </SocketContext.Provider>
      </AppContext.Provider>
    </div>
  );
};

export default App;
