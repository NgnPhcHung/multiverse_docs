import { CollapsiblePanel, ResizablePanel } from "@src/components/common";

export const ErrorPanel = () => {
  return (
    <ResizablePanel>
      <CollapsiblePanel
        title="Error"
        className={{
          root: " h-24 w-full bottom-0",
        }}
      >
        No any error
      </CollapsiblePanel>
    </ResizablePanel>
  );
};
