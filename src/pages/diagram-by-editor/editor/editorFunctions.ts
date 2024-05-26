import { EditorTextRelation, RelationType } from "interfaces";
import { Edge, Node } from "reactflow";
import { useDiagramStore } from "store";
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
        if (!noWhiteSpaceEntity[0]) return undefined;
        return {
          name: noWhiteSpaceEntity[0].replace(/[:]/g, ""),
          dataType,
          constrains,
        };
      })
      .filter((e) => e !== undefined);

    return JSON.stringify(mappedEntity);
  };

  const splitToTable = (foreignList: string[]) => {
    if (!foreignList.length) return;

    const relations: Edge[] = [];
    foreignList.forEach((foreign) => {
      Object.keys(RelationType).forEach((relation) => {
        if (foreign.includes(relation)) {
          const related = foreign.trim().replaceAll(" ", ".").split(relation);
          relations.push({
            id: `${related[0].split(".")[0]}.${related[0].split(".")[1]}-${
              related[1].split(".")[0]
            }.${related[1].split(".")[1]}`,
            source: related[0].split(".")[0],
            target: related[1].split(".")[0],
            sourceHandle: `${related[0].split(".")[0]}.${
              related[0].split(".")[1]
            }`,
            targetHandle: `${related[1].split(".")[0]}.${
              related[1].split(".")[1]
            }`,
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
    if (!value) return [];
    if (!value.includes("Create")) return [];

    const userInputValues = lineRegex.exec(value);
    const inputValues = userInputValues?.input ?? userInputValues;
    const newValue = inputValues
      ?.toString()
      ?.replace(/(\r\n|\n|\r)/gm, "")
      .replace(/ +(?= )/g, "");
    const splitTable = newValue?.split("Create ") ?? [];
    const foreignTemp = regexForeign.exec(newValue || "")?.[0].split(",") ?? [];
    const foreign: string[] = [];

    foreignTemp.forEach((f) => {
      f = f.replace("Foreign ", "");
      Object.values(EditorTextRelation).forEach((re) =>
        f.replace(re, RelationType[re])
      );
      foreign.push(f.replace(/\s/g, "").replace(/[.]/g, " "));
    });

    splitToTable(foreign);

    return splitTable;
  };

  const onFormat = (value: string) => {
    if (!value) {
      setNode([]);
      setEdges([]);
      return;
    }

    const tableNodes: Node[] = [];
    const formattedValue = formatValue(value);
    const tablesMap = new Map<string, Node>();

    formattedValue.forEach((v) => {
      const tableName = v.substring(0, v.indexOf(" "));
      const result = v.substring(v.indexOf(" ") + 1).slice(1, -1);
      const tableEntity = formatEntityObject(result);

      if (!tableName) return;

      tableNodes.push({
        id: tableName,
        type: "tables",
        data: { tableEntity },
        position: { x: 125, y: 22 },
      });

      const existedNode = nodes.find((node) => node.id === tableName);

      if (tablesMap.has(tableName)) {
        // Update existing table node
        const existingTable = tablesMap.get(tableName)!;
        tablesMap.set(tableName, {
          ...existingTable,
          data: { tableName, tableEntity },
        });
      } else {
        // Create new table node
        tablesMap.set(tableName, {
          id: tableName,
          type: "tables",
          data: { tableName, tableEntity },
          position: { ...(existedNode?.position ?? { x: 125, y: 22 }) },
        });
      }
    });

    setNode(Array.from(tablesMap.values()));
  };

  return { onFormat, formatValue };
};
