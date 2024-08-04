import { EditorTextRelation } from "@interfaces/EditorTextRelation";
import { RelationType } from "@interfaces/RelationTypes";
import { useDiagramStore } from "@store/diagramStore";
import { Edge, Node } from "@xyflow/react";
import { lineRegex, regexForeign } from "./editorSettings";
import { Constrains } from "./editorVariables";

export const useEditorFormatter = () => {
  const { setNode, setEdges, nodes } = useDiagramStore();

  const formatEntityObject = (entityString?: string): string => {
    if (!entityString) return "";
    const str = entityString.split(")")[0];
    const entities = str.split(",");
    const mappedEntity = entities
      .map((entity) => {
        const noWhiteSpaceEntity = entity
          .replace(/\s+/g, " ")
          .trim()
          .split(" ");
        let dataType = "";
        let constrains = "";

        if (
          !Constrains.map((cons) => cons.toLocaleLowerCase()).includes(
            (noWhiteSpaceEntity[1] ?? "").toLocaleLowerCase()
          )
        ) {
          dataType = noWhiteSpaceEntity[1];
          constrains = noWhiteSpaceEntity.slice(2).toString();
        } else {
          dataType = noWhiteSpaceEntity[2];
          constrains = noWhiteSpaceEntity.slice(1).toString();
        }
        if (!noWhiteSpaceEntity[0]) {
          return undefined;
        }
        return {
          name: noWhiteSpaceEntity[0].replace(/[:]/g, ""),
          dataType,
          constrains,
        };
      })
      .filter((e) => e !== undefined);

    const results:
      | { name: string; dataType: string; constrains: string }[]
      | undefined = [];

    mappedEntity.forEach((element) => {
      if (element !== undefined) {
        results.push(element);
      }
    });
    return JSON.stringify(results);
  };

  const splitToTable = (foreignList: string[]) => {
    if (!foreignList.length) return;

    const relations: Edge[] = [];
    foreignList.map((foreign: string) => {
      Object.keys(RelationType).map((relation) => {
        if (!foreign.includes(relation)) {
          return;
        } else {
          const related = foreign.trim().replaceAll(" ", ".").split(relation);
          const sourceHandler = `${related[0].split(".")[0]}.${
            related[0].split(".")[1]
          }`;
          const targetHandler = `${related[1].split(".")[0]}.${
            related[1].split(".")[1]
          }`;

          relations.push({
            id: `${sourceHandler}-${targetHandler}`,
            source: sourceHandler,
            target: targetHandler,
            type: "floating",
            data: {
              label: RelationType[relation as keyof typeof RelationType],
            },
          });
        }
      });
    });
    setEdges(relations);
  };

  const formatValue = (value: string) => {
    if (!value) return;
    if (!value.includes("Create")) return;

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
      f = f.replace("Foreign ", "");
      Object.values(EditorTextRelation).map((re) =>
        f.replace(re, RelationType[re])
      );
      f = f.replace(/\s/g, "");
      foreign.push(f.replace(/[.]/g, " "));
    });

    splitToTable(foreign);

    return splitTable || [];
  };

  const onFormat = (value: string) => {
    if (!value) {
      return;
    }

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
            tableEntity: formatEntityObject(tableEntity),
          },
          position: { x: 125, y: 22 },
        });
        if (tableName === null && tableEntity === null) return "";

        if (tables.length <= 0 && tableName.length) {
          // tables.push({ tableName, tableEntity });
          tables.push({
            id: tableName,
            type: "tables",
            data: { tableName, tableEntity: formatEntityObject(tableEntity) },
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
            const existedNode = nodes.find((node) => node.id === tableName);

            if (nameFlag === 0) {
              tables.push({
                id: tableName,
                type: "tables",
                data: {
                  tableName,
                  tableEntity: formatEntityObject(tableEntity),
                },
                position: { ...(existedNode?.position ?? { x: 125, y: 22 }) },
              });
            } else if (nameFlag === 1 && !!existedNode) {
              if (tb.data.tableEntity || entityFlag === 1) {
                const filteredTable = tables.filter(
                  (item) => item.data.tableName !== tableName
                );
                tables = filteredTable;
                tables.push({
                  id: tableName,
                  type: "tables",
                  data: {
                    tableName,
                    tableEntity: formatEntityObject(tableEntity),
                  },
                  position: { ...existedNode.position },
                });
              }
            }
          });
        }
      }
    });

    const newTable = tables.map((table) => {
      const entity = new String(table.data.tableEntity);
      const splitted = entity.split(")")[0];

      return {
        ...table,
        data: {
          tableName: table.data.tableName,
          tableEntity: splitted,
        },
        id: table.data.tableName as string,
        position: { x: 125, y: 22 },
      };
    });

    setNode(newTable);
  };

  return { onFormat, formatValue };
};
