import { Suspense, lazy } from "react";
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
  return (
    <AppLayout>
      <RouterProvider router={routes} />
    </AppLayout>
  );
};

export default App;
