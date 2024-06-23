import { CircleOff, KeyIcon } from "lucide-react";
import { ReactNode } from "react";
import { ColumnDefinition } from "../editor/editorConverter";
import { Handle, Position } from "reactflow";

interface TableRowProps {
  data: ColumnDefinition;
  name: string;
  tableName: string;
}
const Special = ({ content }: { content: string }) => {
  return (
    <div className="bg-secondaryHover text-sm px-1 rounded-md">{content}</div>
  );
};
const mapper = {
  isNotNull: <CircleOff className="w-3 h-3" />,
  isUnique: <Special content="U" />,
  nullValue: undefined,
};

export const TableRow = ({ tableName, name, data }: TableRowProps) => {
  const getMapperKey = (key: keyof ColumnDefinition) => {
    if (data[key] === true) return key as string;
    if (typeof data[key] === "string") return data[key];
    return "nullValue";
  };
  console.log(`${tableName}.${name}`)
  return (
    <div className="px-2 flex justify-between relative">
      <div className="mr-4 flex items-center space-x-2">
        <div>{name}</div>
        {data.primaryKey && <KeyIcon className="w-2 h-2" />}
      </div>
      <div className="flex items-center space-x-1">
        {Object.keys(data).map((key) => {
          const specialKeys = ["type"];
          let renderEle: ReactNode =
            mapper[getMapperKey(key as keyof ColumnDefinition)];
          if (specialKeys.includes(key)) {
            renderEle = data[key];
          }
          return renderEle && <div key={key}>{renderEle}</div>;
        })}
      </div>
      <Handle
        type="target"
        position={Position.Left}
        // className="opacity-0"
        id={`${tableName}.${name}`}
      />
      <Handle
        type="target"
        position={Position.Right}
        // className="opacity-0"
        id={`${tableName}.${name}`}
      ></Handle>

      <Handle
        type="source"
        position={Position.Right}
        // className="opacity-0"
        id={`${tableName}.${name}`}
      />
      <Handle
        type="source"
        position={Position.Left}
        // className="opacity-0"
        id={`${tableName}.${name}`}
      />
    </div>
  );
};
