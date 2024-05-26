import { AppLayout } from "@components";
import { Suspense, lazy } from "react";

import { Route, Routes, useLocation } from "react-router-dom";

const ViewSelectorPage = lazy(() => import("./view-selector"));
const DiagramByEditorPage = lazy(
  () => import("./diagram-by-editor")
);
const SketchNotePage = lazy(() => import("./SketchNotePage"));

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
          path="sketch-note"
          element={
            <Suspense>
              <SketchNotePage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};
