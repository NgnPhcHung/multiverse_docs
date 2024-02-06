import { Edge, Node } from "reactflow";
import { TableType, useDiagramStore } from "store";
import { lineRegex, regexForeign } from "./editorSettings";

export const useEditorFormatter = () => {
  const { setNode, setEdges } = useDiagramStore();

  const splitToTable = (foreignList: string[]) => {
    const relations: Edge[] = [];
    foreignList.map((foreign) => {
      const related = foreign.trim().replaceAll(" ", ".").split("--");

      relations.push({
        id: related[0].split(".")[0],
        source: related[0].split(".")[0],
        target: related[1].split(".")[0],
        type: "smoothstep",
      });
    });
    setEdges(relations);
  };

  const formatValue = (value: string) => {
    const userInputValues = lineRegex.exec(value);
    const inputValues = userInputValues?.input
      ? userInputValues.input
      : userInputValues;

    const newValue = inputValues
      ?.toString()
      ?.replace(/(\r\n|\n|\r)/gm, "")
      .replace(/ +(?= )/g, "");

    const splitTable = newValue?.split("Create ");
    const foreignTemp = regexForeign.exec(newValue || "")?.[0].split(",");

    const foreign: string[] = [];
    foreignTemp?.forEach((f) => {
      f = f.replace("Foreign ", "").replace(/[<<>>~-]/g, "-");
      f = f.replace(/\s/g, "");
      foreign.push(f.replace(/[.]/g, " "));
    });

    splitToTable(foreign);

    return splitTable;
  };

  const onFormat = (value: string) => {
    if (!value) return;

    const tableNodes: Node[] = [];
    const formattedValue = formatValue(value);
    let tables: Node[] = [];

    formattedValue?.forEach((v) => {
      let nameFlag = 0;
      let entityFlag = 0;

      const regexValue = v;
      if (regexValue !== null) {
        const tableName = regexValue.substring(0, regexValue.indexOf(" "));
        const result = regexValue
          .substring(regexValue.indexOf(" ") + 1)
          .slice(1, -1);
        const tableEntity = result;
        if (!tableName) return;

        tableNodes.push({
          id: tableName,
          type: "tables",
          data: {
            tableEntity,
          },
          position: { x: 0, y: 0 },
        });
        if (tableName === null && tableEntity === null) return "";

        if (tables.length <= 0) {
          // tables.push({ tableName, tableEntity });
          tables.push({
            id: tableName,
            type: "tables",
            data: { tableName, tableEntity },
            position: { x: 125, y: 22 },
          });
        } else {
          tables.forEach((tb) => {
            nameFlag = 0;
            entityFlag = 0;
            tables.forEach((v) => {
              if (v.data.tableName === tableName) {
                nameFlag++;
                if (v.data.tableEntity) entityFlag++;
              }
            });
            if (nameFlag === 0) {
              tables.push({
                id: tableName,
                type: "tables",
                data: { tableName, tableEntity },
                position: { x: 125, y: 22 },
              });
            } else if (nameFlag === 1) {
              if (tb.data.tableEntity || entityFlag === 1) {
                const filteredTable = tables.filter(
                  (item) => item.data.tableName !== tableName
                );
                tables = filteredTable;
                tables.push({
                  id: tableName,
                  type: "tables",
                  data: { tableName, tableEntity },
                  position: { x: 125, y: 22 },
                });
              }
            }
          });
        }
      }
    });

    const newTable = tables.map((table) => {
      const entity = new String(table.data.tableEntity);
      const splited = entity.split(")")[0];

      return {
        ...table,
        data: {
          tableName: table.data.tableName,
          tableEntity: splited,
        },
      };
    });

    console.log(newTable);
    setNode(newTable);
  };

  return { onFormat, formatValue };
};
