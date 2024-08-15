import { Entity } from "@src/interfaces";
import { useDiagramStore } from "@src/store";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import clsx from "clsx";

type TableProps = {
  id: string;
  data: Node;
};

export type CustomNode = Node<TableProps>;


export const Tables = (data: NodeProps<Node<Entity>>) => {
  const nodeData = data.data;
  const { edges } = useDiagramStore();

  const currentRow = `${data.parentId}.${nodeData.name}`;
  const handler = edges.find((edge) => edge.id.includes(currentRow));



  return (
    <div
      className={clsx(
        "min-w-48 h-fit bg-secondaryHover text-primaryHover",
        nodeData.className
      )}
    >
      <div>{nodeData.name}</div>
      {!!handler && (
        <>
          <Handle id={handler.source} type="source" position={Position.Left} />
          <Handle id={handler.source} type="source" position={Position.Right} />
          <Handle id={handler.target} type="target" position={Position.Right} />
          <Handle id={handler.target} type="target" position={Position.Right} />
        </>
      )}
    </div>
  );
};
