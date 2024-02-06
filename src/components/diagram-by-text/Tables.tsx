import { useCallback } from "react";
import {
  Connection,
  Edge,
  Handle,
  Node,
  NodeProps,
  Position,
  updateEdge,
  useEdges,
  useEdgesState,
  useNodes,
} from "reactflow";
import { TableType } from "store";

type TableProps = {
  id: string;
  data: Node;
};
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
  console.log("Data node from table", data);
  const tableInfo = data.data;

  return (
    <div className="w-44 h-24 bg-white">
      {/* <Handle
        type="target"
        position={Position.Left}
        className="bg-gray-300"
        isConnectable={false}
        id={id}
      />
      <Handle
        type="target"
        position={Position.Right}
        className="bg-gray-300"
        isConnectable={false}
        id={id}
      /> */}
      {/* <TableRow rows={data.data} nodeId={data.id} /> */}
      <p>{tableInfo.tableName}</p>
    </div>
  );
  // return (tableList || []).map((table, index) => (
  //   <div key={`${table.tableName}-${index}`}>
  //     <p>{table.tableName}</p>
  //     <TableRow rows={table.tableEntity} />
  //   </div>
  // ));
};
