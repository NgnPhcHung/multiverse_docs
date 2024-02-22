import { AnimatedPage, AppLayout } from "components";
import { AnimatePresence } from "framer-motion";
import { lazy } from "react";

import { Route, Routes, useLocation } from "react-router-dom";

const DiagramByEditorPage = lazy(() => import("./pages/DiagramByEditorPage"));
const ViewSelectorPage = lazy(() => import("./pages/ViewSelectorPage"));
const WorkflowPage = lazy(() => import("./pages/WorkflowPage"));

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="popLayout">
      <Routes location={location} key={location.pathname}>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            index
            element={
              <AnimatePresence>
                <AnimatedPage>
                  <ViewSelectorPage />
                </AnimatedPage>
              </AnimatePresence>
            }
          />
          <Route
            path="text-diagram"
            element={
              <AnimatePresence>
                <AnimatedPage>
                  <DiagramByEditorPage />
                </AnimatedPage>
              </AnimatePresence>
            }
          />
          <Route
            path="work-flow"
            element={
              <AnimatedPage>
                <WorkflowPage />
              </AnimatedPage>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
