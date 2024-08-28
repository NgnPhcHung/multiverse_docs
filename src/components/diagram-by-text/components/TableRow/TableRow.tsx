import { DiagramDataType, Entity, EntityProperty } from "@src/interfaces";
import { useDiagramStore } from "@src/store";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { Popover } from "antd";
import clsx from "clsx";
import { RowTooltip } from "./RowTooltip";

type TableProps = {
  id: string;
  data: Node;
};

export type CustomNode = Node<TableProps>;

export const TableRow = (data: NodeProps<Node<Entity>>) => {
  const nodeData = data.data;
  const { edges } = useDiagramStore();
  const currentRow = `${data.parentId}.${nodeData.name}`;
  const handler = edges.find((edge) => edge.id.includes(currentRow));

  const isProperty = (value: any): value is EntityProperty => {
    return value?.renderType === DiagramDataType.Property;
  };
  return (
    <div
      className={clsx(
        "w-56 h-fit bg-secondary text-primaryHover",
        nodeData.className
      )}
    >
      <Popover
        content={
          isProperty(nodeData) &&<RowTooltip data={isProperty(nodeData) ? nodeData : undefined} />
        }
        placement="right"
      >
        <div className="grid grid-cols-2 w-full">
          <div
            className={clsx(
              "text-truncate text-ellipsis overflow-hidden",
              isProperty(nodeData) ? "col-span-1" : "col-span-2"
            )}
          >
            {nodeData.name}
          </div>
          {isProperty(nodeData) && (
            <div className="col-span-1 justify-self-end">
              {nodeData.dataType}
            </div>
          )}
        </div>
      </Popover>
      {!!handler && (
        <>
          <Handle
            id={handler.source}
            type="source"
            position={Position.Left}
            className="opacity-0"
          />
          <Handle
            id={handler.source}
            type="source"
            position={Position.Right}
            className="opacity-0"
          />
          <Handle
            id={handler.target}
            type="target"
            position={Position.Right}
            className="opacity-0"
          />
          <Handle
            id={handler.target}
            type="target"
            position={Position.Right}
            className="opacity-0"
          />
        </>
      )}
    </div>
  );
};
