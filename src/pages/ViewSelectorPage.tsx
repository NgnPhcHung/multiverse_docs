import { AnimatedPage, ViewSelector } from "components";
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
