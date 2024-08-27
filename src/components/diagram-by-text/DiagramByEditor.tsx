import { Sidebar } from "@components/common";
import { Editor } from "@components/editor";
import { useEditorStore } from "@src/store";
import { useDiagramStore } from "@store/diagramStore";
import { ReactFlowProvider } from "@xyflow/react";
import { useEffect } from "react";
import { FileExportSelector, TemplateSelector } from "./components";
import { Diagram } from "./Diagram";

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
            <div className="space-x-2 flex items-center">
              <FileExportSelector />
              <TemplateSelector />
            </div>
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
