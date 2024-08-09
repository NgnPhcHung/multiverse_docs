import { EditorTextRelation } from "@interfaces/EditorTextRelation";
import { RelationType } from "@interfaces/RelationTypes";
import { Entity, EntityProperty } from "@src/interfaces";
import { formatStringToEntityProperty } from "@src/utils";
import { useDiagramStore } from "@store/diagramStore";
import { CoordinateExtent, Edge, Node } from "@xyflow/react";
import { lineRegex, regexForeign } from "./editorSettings";

export const useEditorFormatter = () => {
  const { setNode, setEdges, nodes } = useDiagramStore();

  const removeDuplicated = <T extends Record<string, unknown>>(
    data: Node<T>[]
  ) => {
    const counter: Record<string, number> = {};
    const duplicated: Node<T>[] = [];
    const copiedData = [...data];
    copiedData.forEach((item) => {
      if (!counter[item.id]) {
        counter[item.id] = 1;
      } else {
        counter[item.id]++;
      }
    });

    copiedData.forEach((item, idx) => {
      if (counter[item.id] > 1) {
        duplicated.push(copiedData.splice(idx, 1)[0]);
      }
    });

    return {
      remaining: copiedData,
      duplicated,
    };
  };

  const createEdges = (foreignList: string[]) => {
    if (!foreignList.length) return;

    const relations: Edge[] = [];
    foreignList.map((foreign: string) => {
      Object.keys(RelationType).map((relation) => {
        if (!foreign.includes(relation)) {
          return;
        } else {
          const related = foreign.trim().replaceAll(" ", ".").split(relation);
          relations.push({
            id: `${related[0]}-${related[1]}`,
            source: related[0],
            target: related[1],
            sourceHandle: related[0],
            targetHandle: related[1],
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

    createEdges(foreign);

    return splitTable || [];
  };

  const onFormat = (value: string) => {
    if (!value) {
      return;
    }
    const tableNodes: Node<Entity>[] = [];
    let tables: Node<Entity>[] = [];
    const entityProperties: Node<EntityProperty>[] = [];
    const formattedValue = formatValue(value);
    let tempProperties: Node<EntityProperty>[] = [];

    formattedValue?.forEach((v) => {
      const regexValue = v;
      if (regexValue !== null) {
        const tableName = regexValue.substring(0, regexValue.indexOf(" "));
        const tableEntity = regexValue
          .substring(regexValue.indexOf(" ") + 1)
          .slice(1, -1);
        if (!tableName) return;
        const baseSettings = (property: EntityProperty, index: number) => {
          return {
            id:
              tableName +
              property.name +
              property.dataType +
              property.constrains,
            type: "tables",
            extent: "parent" as "parent" | CoordinateExtent,
            parentId: tableName,
            position: { x: 136, y: 32 * (index + 1) },
          };
        };
        const defaultProperty = (property: EntityProperty, index: number) => {
          return {
            data: {
              ...property,
            },
            ...baseSettings(property, index),
          };
        };

        formatStringToEntityProperty(tableEntity)?.map((property, index) => {
          entityProperties.push(defaultProperty(property, index));
        });
        tableNodes.push({
          id: tableName,
          type: "tables",
          data: {
            name: tableName,
            property: formatStringToEntityProperty(tableEntity),
          },
          position: { x: 125, y: 22 },
        });
        if (tableName === null && tableEntity === null) return "";
        if (tables.length <= 0) {
          tables.push({
            id: tableName,
            type: "tables",
            data: {
              name: tableName,
              property: formatStringToEntityProperty(tableEntity),
            },
            position: { x: 125, y: 22 },
          });
        } else {
          const existedNode = nodes.find((node) => node.id === tableName);

          if (!existedNode) {
            tables.push({
              id: tableName,
              type: "tables",
              data: {
                name: tableName,
                property: formatStringToEntityProperty(tableEntity),
              },
              position: { x: 140, y: 20 },
            });
          } else {
            tables.push({
              ...existedNode,
              id: tableName,
              data: {
                name: tableName,
                property: formatStringToEntityProperty(tableEntity),
              },
            });
          }
        }
        if (tempProperties.length <= 0) {
          formatStringToEntityProperty(tableEntity)?.map((property, index) =>
            tempProperties.push(defaultProperty(property, index))
          );
        } else {
          const existedProperty = nodes.find((node) => node.id === tableName);

          if (!existedProperty) {
            formatStringToEntityProperty(tableEntity)?.map((property, index) =>
              tempProperties.push(defaultProperty(property, index))
            );
          } else {
            formatStringToEntityProperty(tableEntity)?.map((property, index) =>
              tempProperties.push({
                ...existedProperty,
                data: {
                  ...property,
                },
                ...baseSettings(property, index),
              })
            );
          }
        }
      }
    });
    const { duplicated: duplicatedTable, remaining: remainingTable } =
      removeDuplicated(tables);
    tables = remainingTable;

    duplicatedTable.forEach((dupItem, index) => {
      const tableName = `${dupItem.data?.name} copy ${index + 1}`;

      tables.push({
        ...dupItem,
        data: {
          ...dupItem.data,
          name: tableName,
        },
      });
    });

    const { duplicated, remaining } = removeDuplicated(tempProperties);
    tempProperties = remaining;

    duplicated.forEach((dupItem, index) => {
      const tableName = `${dupItem.data?.name} copy ${index + 1}`;

      tempProperties.push({
        ...dupItem,
        data: {
          ...dupItem.data,
          name: tableName,
        },
      });
    });
    setNode([...tempProperties, ...tables]);
  };

  return { onFormat, formatValue };
};
