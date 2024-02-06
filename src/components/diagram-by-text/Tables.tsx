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

type TableProps = {
  id: string;
  data: Node;
};
export type CustomNode = Node<TableProps>;

export const Tables = ({ data }: NodeProps<TableProps>) => {
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
  return (
    <div>
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
      <p>{data.id}</p>
      {/* <TableRow rows={data.data} nodeId={data.id} /> */}
    </div>
  );
  // return (tableList || []).map((table, index) => (
  //   <div key={`${table.tableName}-${index}`}>
  //     <p>{table.tableName}</p>
  //     <TableRow rows={table.tableEntity} />
  //   </div>
  // ));
};
