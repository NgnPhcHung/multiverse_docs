import { Controller } from "./Controller";
import { NoteTakingEditor } from "./NoteTakingEditor";

export const NoteTakingContainer = () => {
  return (
    <div className="w-full h-full relative bg-secondary">
      <NoteTakingEditor />
      <Controller />
    </div>
  );
};
