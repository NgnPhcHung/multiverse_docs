import { AnimatedPage } from "@components/common";
import { ViewSelector } from "@components/view-selector";
import { Outlet } from "react-router-dom";

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
