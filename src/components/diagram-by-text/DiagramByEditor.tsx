import { Sidebar } from "@components/common";
import { Editor } from "@components/editor";
import { useDiagramStore } from "@store/diagramStore";
import { ReactFlowProvider } from "@xyflow/react";
import { useEffect } from "react";
import { Diagram } from "./Diagram";
import { useEditorStore } from "@src/store";

export const DiagramByEditor = () => {
  const diagramStore = useDiagramStore();
  const editorStore = useEditorStore();

  useEffect(() => {
    diagramStore.initStore();
    editorStore.initStore();
  }, []);

  return (
    <div
      key="diagram-editor"
      className="flex dark:bg-brand relative h-full overflow-hidden"
    >
      <Sidebar>
        <Editor />
      </Sidebar>
      <main className="flex-1 overflow-hidden relative bg-diagram">
        <ReactFlowProvider>
          <Diagram />
        </ReactFlowProvider>
      </main>
    </div>
  );
};
