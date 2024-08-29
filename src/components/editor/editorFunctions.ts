import { RelationType } from "@interfaces/RelationTypes";
import {
  BaseEdge,
  Entity,
  EntityProperty,
  EntityStore,
  TableReference,
} from "@src/interfaces";
import { useEditorStore } from "@src/store";
import { formatStringToEntityProperty, groupBy } from "@src/utils";
import { useDiagramStore } from "@store/diagramStore";
import { Edge, Node } from "@xyflow/react";
import {
  defaultProperty,
  defaultTable,
  regexComment,
  regexForeign,
} from "./editorSettings";

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

  const { setEntities, setReference, setIsLoading } = useEditorStore(
    (state) => ({
      setEntities: state.setEntities,
      setReference: state.setReferences,
      setIsLoading: state.setIsLoading,
    })
  );

  const invokeLoader = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

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

    setReference(references);
  };

  const createEdges = (foreignList: string[]) => {
    if (!foreignList.length) return;

    const relations: Edge<BaseEdge>[] = [];
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
        const { comment, constraints } = getComment(property.constrains);
        tempProperties.push(
          defaultProperty(
            itemData.tableName,
            {
              ...property,
              constrains: constraints,
              comment,
            },
            index
          )
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
    invokeLoader();
  };

  const getComment = (value: string) => {
    const matches = regexComment.exec(value);
    const comment = matches ? matches[1] : undefined;
    const rest = value.replace(regexComment, "");

    return {
      comment,
      constraints: rest,
    };
  };

  const saveDBContent = (tempProperties: Node<EntityProperty>[]) => {
    const groupByTable = groupBy(tempProperties, "parentId");
    const entities: EntityStore[] = Object.entries(groupByTable)
      .filter(([key]) => key !== "undefined")
      .map(([key, value]) => {
        const properties: Omit<EntityProperty, "renderType">[] = value.map(
          ({ data: { constrains, dataType, name } }) => {
            const { constraints, comment } = getComment(constrains);
            return {
              constrains: constraints,
              dataType,
              name,
              comment,
            };
          }
        );
        return {
          name: key,
          properties,
        };
      }) as EntityStore[];

    setEntities(entities);
  };

  return { onFormat, formatValue: getForeignLine };
};
