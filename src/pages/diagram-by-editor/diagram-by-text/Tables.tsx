import { Node, NodeProps } from "reactflow";
import { TableDefinition } from "../editor/editorConverter";
import { TableRow } from "./TableRow";

type TableProps = {
  id: string;
  data: Node;
};

export type CustomNode = Node<TableProps>;

export const Tables = (data: NodeProps<TableDefinition>) => {
  const tableInfo = data.data;

  const [columns] = Object.values(tableInfo);
  const tableColumns = columns.columns as TableDefinition["columns"];

  return (
    <div className="min-w-48 h-fit bg-secondary text-primaryHover outline-brand hover:outline">
      <p className=" p-1 font-semibold bg-secondaryHover">
        {columns.tableName}
      </p>
      {Object.keys(tableColumns).map((data) => (
        <TableRow
          tableName={columns.tableName}
          name={data}
          data={tableColumns[data]}
          key={JSON.stringify(tableColumns[data])}
        />
      ))}
    </div>
  );
};
