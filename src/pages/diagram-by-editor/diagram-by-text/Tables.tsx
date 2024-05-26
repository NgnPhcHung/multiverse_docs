import { TableType } from "@store";
import { checkValidJSONString } from "@utils";
import { Key } from "lucide-react";
import { useMemo } from "react";
import { Handle, Node, NodeProps, Position } from "reactflow";

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
  const tableInfo = data.data;
  // const { edges } = useDiagramStore();

  const tableEntity: DiagramTable[] = useMemo(() => {
    if (checkValidJSONString(tableInfo.tableEntity)) {
      return JSON.parse(tableInfo.tableEntity);
    }
    return [];
  }, [tableInfo.tableEntity]);

  // useEffect(() => {
  //   const source: ReactNode[] = [];
  //   const target: ReactNode[] = [];

  //   const onRenderHandler = (
  //     property: string | undefined,
  //     entityName: string,
  //     type: "source" | "target"
  //   ) => {
  //     if (!property || property.includes(entityName)) return null;

  //     return (
  //       <>
  //         <Handle
  //           type={type}
  //           position={Position.Left}
  //           className="bg-primary opacity-0"
  //           id={`${tableInfo.tableName}.${entityName}`}
  //         />
  //         <Handle
  //           type={type}
  //           position={Position.Right}
  //           className="bg-primary  opacity-0"
  //           id={`${tableInfo.tableName}.${entityName}`}
  //         />
  //       </>
  //     );
  //   };

  //   tableEntity.map((entity) => {
  //     const tableRow = `${tableInfo.tableName}.${entity.name}`;
  //     const sourceHandle = edges.find((edge) => edge.sourceHandle === tableRow);
  //     const targetHandle = edges.find((edge) => edge.targetHandle === tableRow);

  //     source.push(
  //       onRenderHandler(
  //         sourceHandle?.sourceHandle ?? undefined,
  //         entity.name,
  //         "source"
  //       )
  //     );
  //     target.push(
  //       onRenderHandler(
  //         targetHandle?.targetHandle ?? undefined,
  //         entity.name,
  //         "target"
  //       )
  //     );
  //   });
  //   setHandlers({ source, target });
  // }, [edges, tableEntity, tableInfo.tableName]);

  return (
    <div className="min-w-48 h-fit bg-secondary text-primaryHover outline-brand hover:outline">
      <p className=" p-1 font-semibold bg-secondaryHover">
        {tableInfo.tableName}
      </p>
      {tableEntity.map((entity) => {
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
      })}
    </div>
  );
};
