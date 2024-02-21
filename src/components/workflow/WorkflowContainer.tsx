import { Sidebar } from "components";
import { WorkflowDndArea } from "./WorkflowDndArea";

export const WorkflowContainer = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <Sidebar>
        <></>
      </Sidebar>
      <WorkflowDndArea />
    </div>
  );
};
