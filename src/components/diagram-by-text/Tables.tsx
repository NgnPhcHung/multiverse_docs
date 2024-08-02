import { useDiagramStore } from "@store/diagramStore";
import { TableType } from "@store/editorStore";
import { checkValidJSONString } from "@utils/checkValidJSONString";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { Key } from "lucide-react";
import { useMemo } from "react";

type TableProps = {
  id: string;
  data: Node;
};

interface DiagramTable {
  name: string;
  dataType: string;
  constrains: string;
}

export type CustomNode = Node<TableProps>;

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export const Tables = (data: NodeProps<TableType>) => {
  const tableInfo = data.data;
  const { edges } = useDiagramStore();

  const tableEntity: DiagramTable[] = useMemo(() => {
    if (
      isString(tableInfo.tableEntity) &&
      checkValidJSONString(tableInfo.tableEntity)
    ) {
      return JSON.parse(tableInfo.tableEntity);
    }
    return [];
  }, [tableInfo.tableEntity]);

  return (
    <div className="min-w-48 h-fit bg-secondaryHover text-primaryHover">
      <p className="p-1 font-semibold bg-secondary">
        {typeof tableInfo.tableName === "string"
          ? tableInfo.tableName
          : "Default Name"}
      </p>
      {tableEntity.map((entity, idx) => {
        const tableRow = `${tableInfo.tableName}.${entity.name}`;
        const sourceHandle = edges.find(
          (edge) => edge.sourceHandle === tableRow
        );
        const targetHandle = edges.find(
          (edge) => edge.targetHandle === tableRow
        );

        let sourceElement = null;
        let targetElement = null;

        if (sourceHandle?.sourceHandle?.includes(entity.name)) {
          sourceElement = (
            <>
              <Handle
                type="source"
                position={Position.Left}
                className="bg-primary opacity-0"
                id={`${tableInfo.tableName}.${entity.name}`}
              />
              <Handle
                type="source"
                position={Position.Right}
                className="bg-primary  opacity-0"
                id={`${tableInfo.tableName}.${entity.name}`}
              />
            </>
          );
        }

        if (targetHandle?.targetHandle?.includes(entity.name)) {
          targetElement = (
            <>
              <Handle
                type="target"
                position={Position.Left}
                className="bg-primary opacity-0"
                id={`${tableInfo.tableName}.${entity.name}`}
              />
              <Handle
                type="target"
                position={Position.Right}
                className="bg-primary  opacity-0"
                id={`${tableInfo.tableName}.${entity.name}`}
              />
            </>
          );
        }

        return (
          <div
            key={`${idx}.${entity.name}`}
            className="hover:bg-secondary p-1 px-2 relative flex justify-between w-full"
          >
            <Handle
              type="target"
              position={Position.Left}
              className="bg-primary opacity-0"
              id={`${tableInfo.tableName}.${entity.name}`}
            />

            <div>
              <>{sourceElement}</>
              <>{targetElement}</>
              {entity.name}
            </div>
            <div className="flex space-x-2 items-center">
              <div className="font-semibold">{entity.dataType}</div>
              {!!entity.constrains && (
                <div>
                  {entity.constrains.includes("PrimaryKey") && (
                    <Key className="w-4 h-4 text-brand font-semibold" />
                  )}
                </div>
              )}
            </div>
            <Handle
              type="target"
              position={Position.Right}
              className="bg-primary opacity-0"
              id={`${tableInfo.tableName}.${entity.name}`}
            />
            <Handle
              type="source"
              position={Position.Right}
              className="bg-primary  opacity-0"
              id={`${tableInfo.tableName}.${entity.name}`}
            />
          </div>
        );
      })}
    </div>
  );
};
