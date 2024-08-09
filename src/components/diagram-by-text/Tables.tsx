import { Entity } from "@src/interfaces";
import { useDiagramStore } from "@store/diagramStore";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";

type TableProps = {
  id: string;
  data: Node;
};

export type CustomNode = Node<TableProps>;

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export const Tables = (data: NodeProps<Node<Entity>>) => {
  const tableInfo = data.data;
  const { edges } = useDiagramStore();
  const tableEntity = tableInfo.property;

  const tableName = isString(tableInfo.name)
    ? tableInfo.name
    : "Undefined Name";

  return (
    <div
      className="min-w-48 h-fit bg-secondaryHover text-primaryHover"
      id={tableName}
    >
      <p className="p-1 font-semibold bg-secondary">{tableName}</p>
      {tableEntity?.map((entity, ind) => {
        const handler = edges.find((edge) =>
          edge.id.includes(`${tableName}.${entity.name}`)
        );

        const isRenderHandler =
          !!handler && handler.id?.includes(`${tableName}.${entity.name}`);
        const sourceHandler =
          data.id === tableName ? handler?.sourceHandle : handler?.targetHandle;
        const targetHandler =
          data.id === tableName ? handler?.targetHandle : handler?.sourceHandle;

        return (
          <div
            className="hover:bg-secondary p-1 px-2 relative flex justify-between w-full h-8"
            key={entity.name + ind}
          >
            {isRenderHandler && (
              <>
                <Handle
                  id={sourceHandler || undefined}
                  type="source"
                  position={Position.Left}
                />
                <Handle
                  id={sourceHandler || undefined}
                  type="source"
                  position={Position.Right}
                />
                <Handle
                  id={targetHandler || undefined}
                  type="source"
                  position={Position.Left}
                />
                <Handle
                  id={targetHandler || undefined}
                  type="source"
                  position={Position.Right}
                />
              </>
            )}
            {isRenderHandler && sourceHandler}-
            {isRenderHandler && targetHandler}
            <div className="flex space-x-2 items-center">
              {/* <div className="font-semibold">{entity.dataType}</div> */}
              {/* {!!entity.constrains && (
                <div>
                  {entity.constrains.includes("PrimaryKey") && (
                    <Key className="w-4 h-4 text-brand font-semibold" />
                  )}
                </div>
              )} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};
