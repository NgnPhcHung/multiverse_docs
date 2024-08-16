import { DiagramDataType, Entity, EntityProperty } from "@src/interfaces";
import { useDiagramStore } from "@src/store";
import { groupBy } from "@src/utils";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import clsx from "clsx";
import { ReactNode, useMemo } from "react";

type TableProps = {
  id: string;
  data: Node;
};

export type CustomNode = Node<TableProps>;

export const Tables = (data: NodeProps<Node<Entity>>) => {
  const nodeData = data.data;
  const { edges, nodes } = useDiagramStore();
  const currentRow = `${data.parentId}.${nodeData.name}`;
  const handler = edges.find((edge) => edge.id.includes(currentRow));

  const isProperty = (value: any): value is EntityProperty => {
    if (!value?.data?.renderType) return false;
    return (
      DiagramDataType[
        value?.data?.renderType as keyof typeof DiagramDataType
      ] === DiagramDataType.Property
    );
  };

  const longestRow = useMemo(() => {
    const grouped = groupBy<Node<Entity | EntityProperty>>(nodes, "parentId");

    const values = Object.values(grouped).map((properties) => {
      let currentParent;
      const maximizedValue = Math.max(
        ...Object.values(properties).map((property) => {
          currentParent = property.parentId;
          return property.measured?.width || 0;
        })
      );
      return {
        maximizedValue,
        parent: currentParent,
      };
    });
    const width = values.find(
      (value) => value.parent === data.id || value.parent === data.parentId
    )?.maximizedValue;

    return width;
  }, [nodes, data]);

  return (
    <div
    style={{
      width: '16rem' // Directly setting the width as '16rem'
    }}
      className={clsx(
        "min-w-48 h-fit bg-secondary text-primaryHover",
        nodeData.className
      )}
    >
      <div>{nodeData.name}</div>
      {nodeData.renderType === DiagramDataType.Property && (
        <div className="flex items-center space-x-2">
          <div>{nodeData.dataType}</div>
          <div>{nodeData.constrains}</div>
        </div>
      )}
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
