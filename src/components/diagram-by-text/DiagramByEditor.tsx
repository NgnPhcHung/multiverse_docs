import { Editor, Sidebar } from "components";
import { useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import { useDiagramStore } from "store";
import { Diagram } from "./Diagram";

export const DiagramByEditor = () => {
  const {
    liveblocks: { leaveRoom },
  } = useDiagramStore();

  useEffect(() => {
    return () => leaveRoom();
  }, [leaveRoom]);

  return (
    <div className="flex dark:bg-brand relative h-full overflow-hidden">
      <Sidebar>
        <Editor />
      </Sidebar>
      <main className="flex-1 overflow-hidden relative bg-primary">
        <ReactFlowProvider>
          <Diagram />
        </ReactFlowProvider>
      </main>
    </div>
  );
};
