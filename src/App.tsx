import { AppLiveBlocksProvider, SocketContext } from "components/providers";
import { Suspense, lazy, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const AppLayout = lazy(() => import("./AppLayout"));
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
  const roomId = "liveblocks-tutorial-ALmzBYbHtOBtB-xV-gSbz";
  const [room, joinRoom] = useState(roomId);
  const [name, setName] = useState("");

  return (
    <AppLayout>
      <SocketContext.Provider
        value={{
          name,
          room,
          setName,
          joinRoom,
        }}
      >
        <AppLiveBlocksProvider>
          <RouterProvider router={routes} />
        </AppLiveBlocksProvider>
      </SocketContext.Provider>
    </AppLayout>
  );
};

export default App;
