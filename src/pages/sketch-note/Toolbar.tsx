import { ActionIcon } from "@components";
import { EraserIcon, PencilIcon, ZoomInIcon } from "lucide-react";

export const Toolbar = () => {
  return (
    <div className="bg-secondaryHover h-2/3 w-16 absolute right-10 top-10 rounded-md flex flex-col items-center py-4 space-y-4">
      <ActionIcon size="md">
        <PencilIcon className="w-4 h-4" />
      </ActionIcon>
      <ActionIcon size="md">
        <EraserIcon className="w-4 h-4" />
      </ActionIcon>
      <ActionIcon size="md">
        <ZoomInIcon className="w-4 h-4" />
      </ActionIcon>
    </div>
  );
};
