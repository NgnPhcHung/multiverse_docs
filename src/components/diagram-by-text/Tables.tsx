import { DiagramDataType, Entity } from "@src/interfaces";
import { useDiagramStore } from "@src/store";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import clsx from "clsx";

type TableProps = {
  id: string;
  data: Node;
};

export type CustomNode = Node<TableProps>;

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export const Tables = (data: NodeProps<Node<Entity>>) => {
  const nodeData = data.data;
  const { edges } = useDiagramStore();

  const tableName = isString(nodeData.name) ? nodeData.name : "Undefined Name";
  const sourceHandle = `${data.parentId}.${nodeData.name}`;
  const handler = edges.find((edge) => edge.id.includes(sourceHandle));

  return (
    <div
      className={clsx(
        "min-w-48 h-fit bg-secondaryHover text-primaryHover",
        nodeData.className
      )}
      id={
        nodeData.renderType === DiagramDataType.Property
          ? sourceHandle
          : tableName
      }
    >
      <div>{nodeData.name}</div>
      {nodeData.renderType === DiagramDataType.Property && !!handler && (
        <>
          <Handle id={handler.source} type="source" position={Position.Left} />
          <Handle id={handler.source} type="source" position={Position.Right} />
        </>
      )}
    </div>
  );
};
