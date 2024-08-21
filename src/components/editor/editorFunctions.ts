import { RelationType } from "@interfaces/RelationTypes";
import {
  DiagramDataType,
  Entity,
  EntityProperty,
  EntityStore,
  TableReference,
} from "@src/interfaces";
import { useEditorStore } from "@src/store";
import { formatStringToEntityProperty, groupBy } from "@src/utils";
import { useDiagramStore } from "@store/diagramStore";
import { CoordinateExtent, Edge, Node } from "@xyflow/react";
import { regexForeign } from "./editorSettings";

const TABLE_TITLE_CLASSNAME =
  "!bg-brandHover p-1 px-2 relative flex justify-between items-center h-10 text-white font-semibold ml-[136px]";

interface TableWithProperty {
  index: number;
  tableName: string;
  properties: string;
}

export const useEditorFormatter = () => {
  const { setNode, setEdges, nodes } = useDiagramStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    setNode: state.setNode,
    setEdges: state.setEdges,
  }));

  const { setEntities, setReference } = useEditorStore((state) => ({
    setEntities: state.setEntities,
    setReference: state.setReferences,
  }));

  const getDuplicated = (data?: TableWithProperty[]) => {
    const cloneData = JSON.parse(JSON.stringify(data)) as TableWithProperty[];
    const counter: Record<string, number[]> = {};
    let duplicated: undefined | TableWithProperty[] = [];
    let remaining: undefined | TableWithProperty[] = [];
    cloneData.forEach((node, index) => {
      if (Object.keys(counter).includes(node.tableName)) {
        counter[node.tableName].push(index);
      } else {
        counter[node.tableName] = [index];
      }
    });

    Object.keys(counter).forEach((record) => {
      if (counter[record].length < 2) {
        delete counter[record];
      }
    });
    const removed = Object.keys(counter).map((dup) =>
      cloneData
        .filter((filtered) => filtered.tableName === dup)
        .map((filtered, index) => {
          if (index > 0) {
            const name = `${filtered.tableName} copy ${index}`;
            filtered.tableName = name;
          }
          return filtered;
        })
    );
    duplicated = removed.reduce((acc, subArr) => acc.concat(subArr), []);

    remaining = data?.filter(
      (root) => !Object.keys(counter).includes(root.tableName)
    );
    return {
      remaining,
      duplicated,
      full: [...(remaining || []), ...duplicated],
    };
  };

  const createReference = (relations: Edge[]) => {
    const references: TableReference[] = relations.map((relation) => {
      const source = relation.source.split(".");
      const target = relation.target.split(".");
      return {
        sourceTable: {
          tableName: source[0],
          tableKey: source[1],
        },
        referenceTable: {
          tableName: target[0],
          tableKey: target[1],
        },
      };
    });

    setReference(references)
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
    createReference(relations);
  };
  const defaultTable = (tableName: string) => {
    return {
      id: tableName,
      type: "tables",
      data: {
        name: tableName,
        renderType: DiagramDataType.Table,
        className: TABLE_TITLE_CLASSNAME,
      },
      position: { x: 136, y: 32 },
    };
  };

  const defaultSettings = (
    tableName: string,
    property: EntityProperty,
    index: number
  ) => {
    return {
      id: `${tableName}.${property.name}`,
      type: "tables",
      position: { x: 136, y: 32 * (index + 1) },
    };
  };

  const defaultProperty = (
    tableName: string,
    property: EntityProperty,
    index: number
  ) => {
    return {
      ...defaultSettings(tableName, property, index),
      extent: "parent" as "parent" | CoordinateExtent,
      parentId: tableName,
      data: {
        ...property,
        type: DiagramDataType.Property,
      },
    };
  };

  const getForeignLine = (inputValue: string) => {
    if (!inputValue || !inputValue.includes("Create")) {
      setEdges([]);
      setNode([]);
      return;
    }

    const newValue = inputValue
      .replace(/(\r\n|\n|\r)/gm, "")
      .replace(/ +(?= )/g, "");

    let foreignSection = regexForeign.exec(newValue || "")?.[0];
    foreignSection = foreignSection?.substring(0, foreignSection?.length);

    const foreignTemp = foreignSection?.split(",");
    const tableSection = newValue
      .split("Create ")
      .slice(1)
      .map((table) => {
        if (foreignSection) {
          return table.replaceAll(foreignSection, "").trim();
        }
        return table.trim();
      });

    const foreign: string[] = [];
    foreignTemp?.forEach((f) => {
      f = f.replace("Foreign ", "").replace(/\s/g, "").replace(/[.]/g, " ");
      foreign.push(f);
    });

    createEdges(foreign);

    return tableSection;
  };

  const onFormat = async (value?: string) => {
    if (!value) {
      setEdges([]);
      setNode([]);
      return;
    }

    const originalTableList = getForeignLine(value)?.filter(
      (value) => !!value.length
    );
    const tempProperties: Node<EntityProperty>[] = [];
    const entities: Node<Entity>[] = [];

    const tableWithProperty: TableWithProperty[] | undefined =
      originalTableList?.map((fValue, index) => {
        const tableName = fValue.substring(0, fValue.indexOf(" "));

        const entityProperties = fValue
          .substring(fValue.indexOf(" ") + 1)
          .slice(1, -1);
        return {
          index,
          tableName,
          properties: entityProperties,
        };
      });

    const { full } = getDuplicated(tableWithProperty);

    full.map((itemData) => {
      const tableProperties = formatStringToEntityProperty(itemData.properties);
      tableProperties?.map((property, index) => {
        tempProperties.push(
          defaultProperty(itemData.tableName, property, index)
        );
      });

      const existedEntity = nodes.find(
        (node) => node.id === itemData.tableName
      );
      if (existedEntity) {
        entities.push({
          ...existedEntity,
          data: {
            ...defaultTable(itemData.tableName).data,
            renderType: existedEntity.data.renderType,
          },
        });
      } else {
        entities.push(defaultTable(itemData.tableName));
      }
    });
    const tableColumns = entities.concat(tempProperties);
    setNode(tableColumns);
    saveDBContent(tableColumns as Node<EntityProperty>[]);
  };

  const saveDBContent = (tempProperties: Node<EntityProperty>[]) => {
    const groupByTable = groupBy(tempProperties, "parentId");
    const entities: EntityStore[] = Object.entries(groupByTable)
      .filter(([key]) => key !== "undefined")
      .map(([key, value]) => {
        const properties: Omit<EntityProperty, "renderType">[] = value.map(
          ({ data: { constrains, dataType, name } }) => {
            return {
              constrains,
              dataType,
              name,
            };
          }
        );
        return {
          name: key,
          property: properties,
        };
      }) as EntityStore[];

    setEntities(entities);
  };

  return { onFormat, formatValue: getForeignLine };
};
