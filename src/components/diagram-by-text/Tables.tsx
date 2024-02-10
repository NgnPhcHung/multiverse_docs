import { Key } from "lucide-react";
import { useMemo } from "react";
import { Handle, Node, NodeProps, Position } from "reactflow";
import { TableType } from "store";
import { checkValidJSONString } from "utils";

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

export const Tables = (data: NodeProps<TableType>) => {
  // const nodes = useNodes();
  // const edges = useEdges();
  // const [listEdges, setEdges] = useEdgesState([]);

  // const currentEdge = edges.find((edge) => edge.source === id);
  // const targetNode = nodes.find((node) => node.id === currentEdge?.target);

  // const onEdgeUpdate = useCallback(
  //   (oldEdge: Edge, newConnection: Connection) =>
  //     setEdges((els) => updateEdge(oldEdge, newConnection, els)),
  //   [setEdges]
  // );

  const tableInfo = data.data;

  // const tableEntity:
  //   | { name: string; dataType: string; constrains: string }[]
  //   | undefined = tableInfo.tableEntity
  //   ? JSON.parse(tableInfo.tableEntity)
  //   : undefined;

  const tableEntity: DiagramTable[] = useMemo(() => {
    if (checkValidJSONString(tableInfo.tableEntity)) {
      return JSON.parse(tableInfo.tableEntity);
    }
    return [];
  }, [tableInfo.tableEntity]);

  return (
    <div className="min-w-48 h-fit bg-secondaryHover text-primaryHover">
      <p className=" p-1 font-semibold bg-secondary">{tableInfo.tableName}</p>
      {tableEntity.map((entity, idx) => {
        return (
          <div
            key={`${idx}.${entity.name}`}
            className="hover:bg-secondary p-1 px-2 relative flex justify-between w-full"
          >
            <Handle
              type="target"
              position={Position.Left}
              className="bg-primary"
              // isConnectable={false}
              id={`${tableInfo.tableName}.${entity.name}`}
            />
            <Handle
              type="source"
              position={Position.Left}
              className="bg-primary"
              // isConnectable={false}
              id={`${tableInfo.tableName}.${entity.name}`}
            />
            <div>{entity.name}</div>
            <div className="flex space-x-2 items-center">
              <div>{entity.dataType}</div>
              {!!entity.constrains && (
                <div>
                  {entity.constrains.includes("PrimaryKey") && (
                    <Key className="w-4 h-4 text-primary" />
                  )}
                </div>
              )}
            </div>
            <Handle
              type="target"
              position={Position.Right}
              className="bg-primary"
              // isConnectable={false}
              id={`${tableInfo.tableName}.${entity.name}`}
            />
            <Handle
              type="source"
              position={Position.Right}
              className="bg-primary"
              // isConnectable={false}
              id={`${tableInfo.tableName}.${entity.name}`}
            />
          </div>
        );
      })}
    </div>
  );
};
