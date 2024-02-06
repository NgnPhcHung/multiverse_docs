import { Editor, Sidebar } from "components";
import { useOthers, useRoom } from "config";
import { useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import { Diagram } from "./Diagram";

export const DiagramByEditor = () => {
  const room = useRoom();
  const others = useOthers();
  useEffect(() => {
    if (others.length < 2) {
      room.disconnect();
    }
  }, []);

  return (
    <div className="flex dark:bg-brand relative h-full overflow-hidden">
      <Sidebar>
        <Editor />
      </Sidebar>
      <main className="flex-1 overflow-hidden relative bg-brand">
        <ReactFlowProvider>
          <Diagram />
        </ReactFlowProvider>
      </main>
    </div>
  );
};
