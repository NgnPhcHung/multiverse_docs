import { Cursors, Sidebar } from "components";
import { useOthers, useRoom } from "config";
import { useEffect } from "react";
import { Diagram } from "./Diagram";
import { ReactFlowProvider } from "reactflow";

export const DiagramByEditor = () => {
  const room = useRoom();
  const others = useOthers();
  useEffect(() => {
    console.log(others.length, others);
    if (others.length < 2) {
      room.disconnect();
    }
  }, []);

  return (
    <div className="flex dark:bg-brand relative h-full overflow-hidden">
      <Sidebar>{/* <Editor /> */}</Sidebar>
      {/* <main className="flex-1 w-full h-full overflow-hidden relative bg-brand"> */}
      <main className="flex-1 overflow-hidden relative">
        {/* <DnDArea /> */}
        <ReactFlowProvider>
          <Cursors />
          <Diagram />
        </ReactFlowProvider>
      </main>
      {/* </main> */}
    </div>
  );
};
