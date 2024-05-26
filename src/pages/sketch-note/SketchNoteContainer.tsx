import { Sidebar } from "@components";
import { Toolbar } from "./Toolbar";

export const SketchNoteContainer = () => {
  return (
    <div className="flex bg-secondary relative h-full overflow-hidden">
      <Sidebar />


      
      <Toolbar />
    </div>
  );
};
