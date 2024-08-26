import { CollapsiblePanel, ResizablePanel } from "@src/components/common";
import { TableError } from "@src/interfaces";
import { useEditorStore } from "@src/store";
import { Loader, AlertTriangle } from "lucide-react";
import { useMemo, useState } from "react";
import { ErrorLoadingState } from "./ErrorLoadingState";
import { ErrorMsg } from "./ErrorMsg";

export const ErrorPanel = () => {
  const { isLoading, relations, entities } = useEditorStore((state) => ({
    isLoading: state.isLoading,
    relations: state.references,
    entities: state.entities,
  }));
  const [isPanelOpened, setIsPanelOpened] = useState(false);
  const sqlErrors = useMemo(() => {
    if (isLoading) return [];

    const errors: TableError[] = [];

    // REGION: Foreign key referencing a non-existent table or column
    //reference source table not found
    //reference target table not found  |
    //reference source key not found    |
    //reference target key not found    |
    entities?.map((table) => {
      const foundedRelation = relations?.find(
        (relation) =>
          relation.sourceTable.tableName === table.name ||
          relation.referenceTable.tableName === table.name
      );
      if (!foundedRelation) {
        errors.push({
          title: "Table not found",
          message: `Reference to table \`${table.name}\` not found`,
        });
      }
      const existedReferenceProperty = table.property?.find(
        (property) =>
          foundedRelation?.referenceTable.tableKey.includes(property.name) ||
          foundedRelation?.sourceTable.tableKey.includes(property.name)
      );
      if (!existedReferenceProperty) {
        errors.push({
          title: "Foreign key referencing a non-existent",
          message: `Reference key ${foundedRelation?.referenceTable.tableKey} to table \`${table.name}\` not found`,
        });
      }
    });
    //REGION: Foreign key mismatch type
    return errors;
  }, [entities, relations, isLoading]);

  return (
    <ResizablePanel isPanelOpened={isPanelOpened}>
      <CollapsiblePanel
        isOpen={isPanelOpened}
        handleTitleClicked={() => setIsPanelOpened(!isPanelOpened)}
        title={
          <div className="flex items-center justify-between w-full">
            <div>Errors</div>
            {isLoading && <Loader className="animate-spin size-4" />}
            {!!sqlErrors.length && (
              <div className="flex items-center space-x-1 text-red-500">
                <AlertTriangle size={16}/>
                <div>{sqlErrors.length}</div>
              </div>
            )}
          </div>
        }
        className={{
          root: " h-full w-full bottom-0 border-0 border-t-1 border-solid border-primary",
        }}
      >
        <ErrorLoadingState fallback={<ErrorMsg msg={sqlErrors} />} />
      </CollapsiblePanel>
    </ResizablePanel>
  );
};
