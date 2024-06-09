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
        {Object.keys(tableInfo)[0]}
      </p>
      {Object.keys(tableColumns).map((data) => (
        <TableRow name={data} data={tableColumns[data]} />
      ))}
      {/* {tableEntity.map((entity) => {
        return (
          <div
            key={`${entity.name}`}
            className="hover:bg-diagram p-1 px-2 relative flex justify-between w-full"
          >
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{entity.name}</span>
              {!!entity.constrains && (
                <div>
                  {entity.constrains.includes("PrimaryKey") && (
                    <Key className="w-3 h-3 text-brand font-semibold" />
                  )}
                </div>
              )}
            </div>
            <div className="flex space-x-2 items-center">
              <div className="font-semibold">{entity.dataType}</div>
            </div>
            <Handle
              type="target"
              position={Position.Left}
              className="bg-primary opacity-0"
              id={`${tableInfo.tableName}.${entity.name}`}
            />
            <Handle
              type="target"
              position={Position.Right}
              className="bg-primary opacity-0"
              id={`${tableInfo.tableName}.${entity.name}`}
            />

            <Handle
              type="source"
              position={Position.Right}
              className="bg-primary opacity-0"
              id={`${tableInfo.tableName}.${entity.name}`}
            />
            <Handle
              type="source"
              position={Position.Left}
              className="bg-primary opacity-0"
              id={`${tableInfo.tableName}.${entity.name}`}
            />
          </div>
        );
      })} */}
    </div>
  );
};
