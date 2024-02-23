import { Controller } from "./Controller";
import { NoteTakingEditor } from "./NoteTakingEditor";

export const NoteTakingContainer = () => {
  return (
    <div className="w-full h-screen overflow-auto relative bg-secondary">
      <NoteTakingEditor />
      <Controller />
    </div>
  );
};
