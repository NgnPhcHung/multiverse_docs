import { Breadcrumbs } from "components";
import { useMemo, useState } from "react";
import { Outlet, useLocation, useOutlet } from "react-router-dom";

const AnimatedOutlet: React.FC = () => {
  const o = useOutlet();
  const [outlet] = useState(o);

  return <>{outlet}</>;
};

export const AppLayout = () => {
  const location = useLocation();
  useMemo(() => {}, [location]);

  return (
    <>
      <Breadcrumbs />
      <AnimatedOutlet />
    </>
  );
};
