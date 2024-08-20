import { Sidebar } from "@components/common";
import { Editor } from "@components/editor";
import { useDiagramStore } from "@store/diagramStore";
import { ReactFlowProvider } from "@xyflow/react";
import { useEffect } from "react";
import { Diagram } from "./Diagram";
import { useEditorStore } from "@src/store";
import { FileExportSelector } from "./components";

export const DiagramByEditor = () => {
  const { initStore: initDiagram, hydrateStore, hydrated } = useDiagramStore();
  const { initStore: initEditor } = useEditorStore();

  useEffect(() => {
    hydrateStore();
    initDiagram();
    initEditor();
  }, []);

  return (
    hydrated && (
      <div
        key="diagram-editor"
        className="flex dark:bg-brand relative h-full overflow-hidden"
      >
        <Sidebar
          navItems={
            <>
              <FileExportSelector />
            </>
          }
        >
          <Editor />
        </Sidebar>
        <main className="flex-1 overflow-hidden relative bg-diagram">
          <ReactFlowProvider>
            <Diagram />
          </ReactFlowProvider>
        </main>
      </div>
    )
  );
};
