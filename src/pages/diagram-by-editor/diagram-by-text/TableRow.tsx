import { CircleOff } from "lucide-react";
import { ColumnDefinition } from "../editor/editorConverter";

interface TableRowProps {
  data: ColumnDefinition;
  name: string;
}
const mapper = {
  isNotNull: <CircleOff />,
  isUnique: <CircleOff />,
  primaryKey: <CircleOff />,
  nullValue: undefined,
};
type MapperKey = keyof typeof mapper;

export const TableRow = ({ name, data }: TableRowProps) => {
  const getMapperKey = (key: keyof ColumnDefinition) => {
    if (data[key] === true) return key;
    if (typeof data[key] === "string") return data[key];
    return "nullValue";
  };

  return (
    <div className="px-2 flex justify-between">
      <div className="mr-4">{name}</div>
      {Object.keys(data).map((key) => {
        const specialKeys = ["type"];
        let renderEle = mapper[getMapperKey(key)];
        if (specialKeys.includes(key)) {
          renderEle = data[key];
        }
        return renderEle && <div key={key}>{renderEle}</div>;
      })}
    </div>
  );
};
