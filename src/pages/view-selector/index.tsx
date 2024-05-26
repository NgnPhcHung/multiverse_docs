import { AnimatedPage } from "@components";
import { Outlet } from "react-router-dom";
import { ViewSelector } from "./ViewSelector";

function ViewSelectorPage() {
  return (
    <>
      <AnimatedPage>
        <ViewSelector />
        <Outlet />
      </AnimatedPage>
    </>
  );
}

export default ViewSelectorPage;
