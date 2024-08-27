import { CollapsiblePanel, ResizablePanel } from "@src/components/common";
import { useEditorStore } from "@src/store";
import { useState } from "react";
import { ErrorLoadingState } from "./ErrorLoadingState";
import { ErrorMsg } from "./ErrorMsg";
import { ErrorSpinner } from "./ErrorSpinner";
import { checkSQLErrors } from "./sqlErrorCheck";

export const ErrorPanel = () => {
  const { relations, entities } = useEditorStore((state) => ({
    relations: state.references,
    entities: state.entities,
  }));
  const errors = checkSQLErrors({ relations, entities });
  errors;

  const [isPanelOpened, setIsPanelOpened] = useState(false);

  return (
    <ResizablePanel isPanelOpened={isPanelOpened}>
      <CollapsiblePanel
        isOpen={isPanelOpened}
        handleTitleClicked={() => setIsPanelOpened(!isPanelOpened)}
        title={
          <div className="flex items-center justify-between w-full">
            <div>Errors</div>
            <ErrorSpinner errorCount={errors.length} />
          </div>
        }
        className={{
          root: " h-full w-full bottom-0 border-0 border-t-1 border-solid border-primary",
        }}
      >
        <ErrorLoadingState fallback={<ErrorMsg msg={errors} />} />
      </CollapsiblePanel>
    </ResizablePanel>
  );
};
