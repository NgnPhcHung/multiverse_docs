import { AnimatedPage, Breadcrumbs } from "@components/common";
import { useState } from "react";
import { useOutlet } from "react-router-dom";

const AnimatedOutlet: React.FC = () => {
  const o = useOutlet();
  const [outlet] = useState(o);

  return <>{outlet}</>;
};

export const AppLayout = () => {
  return (
    <>
      <Breadcrumbs />
      <AnimatedPage>
        <AnimatedOutlet />
      </AnimatedPage>
    </>
  );
};
