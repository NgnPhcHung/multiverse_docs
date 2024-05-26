import { Editor, Nav, Sidebar } from "@components";
import { useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import { useDiagramStore } from "@store";
import { Diagram } from "./Diagram";
import { RoomSettings } from "./RoomSettings";
import { DiagramDocuments } from "./DiagramDocuments";
import { ImportFile } from "./ImportFile";

export const DiagramByEditor = () => {
  const {
    liveblocks: { leaveRoom },
  } = useDiagramStore();

  useEffect(() => {
    return () => leaveRoom();
  }, [leaveRoom]);

  return (
    <div
      key="diagram-editor"
      className="flex dark:bg-brand relative h-full overflow-hidden"
    >
      <Sidebar
        navbar={
          <Nav>
            <RoomSettings />
            <DiagramDocuments />
            <ImportFile />
          </Nav>
        }
      >
        <Editor />
      </Sidebar>
      <div className="flex-1 overflow-hidden relative bg-primary">
        <ReactFlowProvider>
          <Diagram />
        </ReactFlowProvider>
      </div>
    </div>
  );
};
