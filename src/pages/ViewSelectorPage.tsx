import { ViewSelector } from "components";
import { Outlet } from "react-router-dom";

function ViewSelectorPage() {
  return (
    <>
      <ViewSelector />
      <Outlet />
    </>
  );
}

export default ViewSelectorPage;
