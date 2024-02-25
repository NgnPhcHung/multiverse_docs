import { Sidebar } from "components/common";
import DrawingPanel from "./DrawingPanel";
import { NoteTakingEditor } from "./NoteTakingEditor";

export const NoteTakingContainer = () => {
  return (
    <div className="w-full h-screen overflow-auto relative flex bg-secondary">
      <Sidebar customMinWidth={480}>
        <div className="h-[calc(100vh-140px)] bg-secondary pt-8 overflow-auto ">
          <NoteTakingEditor />
        </div>
      </Sidebar>
      <main className="flex-1 overflow-hidden relative bg-primary">
        <DrawingPanel />
      </main>
    </div>
  );
};
