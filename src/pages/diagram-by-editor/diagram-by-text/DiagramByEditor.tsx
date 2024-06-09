import { Nav, Sidebar } from "@components";
import { useDiagramStore } from "@store";
import { useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import { Editor } from "../editor";
import { Diagram } from "./Diagram";
import { DiagramDocuments } from "../diagram-document";
import { ImportFile } from "./ImportFile";
import { RoomSettings } from "./RoomSettings";

export const DiagramByEditor = () => {
  const {
    liveblocks: { leaveRoom },
    setEdges,
    setNode,
  } = useDiagramStore();

  useEffect(() => {
    return () => leaveRoom();
  }, [leaveRoom]);


  
  useEffect(() => {
    return () => {
      setNode([]);
      setEdges([]);
    };
  }, [setNode, setEdges]);

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
