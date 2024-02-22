import { AppLayout } from "components";
import { Suspense, lazy } from "react";

import { Route, Routes, useLocation } from "react-router-dom";

const ViewSelectorPage = lazy(() => import("./pages/ViewSelectorPage"));
const DiagramByEditorPage = lazy(() => import("./pages/DiagramByEditorPage"));
const WorkflowPage = lazy(() => import("./pages/WorkflowPage"));
const NoteTakingPage = lazy(() => import("./pages/NoteTakingPage"));

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/*" element={<AppLayout />}>
        <Route
          index
          element={
            <Suspense>
              <ViewSelectorPage />
            </Suspense>
          }
        />
        <Route
          path="text-diagram"
          element={
            <Suspense>
              <DiagramByEditorPage />
            </Suspense>
          }
        />
        <Route
          path="work-flow"
          element={
            <Suspense>
              <WorkflowPage />
            </Suspense>
          }
        />
        <Route
          path="note-taking"
          element={
            <Suspense>
              <NoteTakingPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};
