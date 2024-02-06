import { Handle, Position } from "reactflow";

interface TableRowProps {
  rows: string;
  nodeId: string;
}

export const TableRow = ({ rows, nodeId }: TableRowProps) => {
  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        className="bg-gray-300"
        isConnectable={false}
        id={nodeId}
      />
      {rows}
      <Handle
        type="target"
        position={Position.Right}
        className="bg-gray-300"
        isConnectable={false}
        id={nodeId}
      />
    </div>
  );
};
