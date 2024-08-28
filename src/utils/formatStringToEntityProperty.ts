import { Constrains, DiagramDataType, EntityProperty } from "@src/interfaces";

const PROPERTY_CLASSNAME =
  "p-1 px-2 relative flex justify-between h-16 z-8 nodrag cursor-default";

export const formatStringToEntityProperty = (
  entityString?: string
): EntityProperty[] | undefined => {
  if (!entityString) return;

  const str = entityString;
  const entities = str.split(",");
  const mappedEntity: undefined | EntityProperty[] = entities
    .map((entity) => {
      const noWhiteSpaceEntity = entity
        .trim()
        .split(/(?!\([^)]*)\s(?![^(]*\))/);
      let dataType = "";
      let constrains = "";
      if (
        !Constrains.map((cons) => cons.toLocaleLowerCase()).includes(
          (noWhiteSpaceEntity[1] ?? "").toLocaleLowerCase()
        )
      ) {
        dataType = noWhiteSpaceEntity[1];
        constrains = noWhiteSpaceEntity
          .slice(2)
          .toString()
          .replaceAll(",", " ");
      } else {
        dataType = noWhiteSpaceEntity[2];
        constrains = noWhiteSpaceEntity
          .slice(1)
          .toString()
          .replaceAll(",", " ");
      }
      if (!noWhiteSpaceEntity[0]) {
        return undefined;
      }
      return {
        name: noWhiteSpaceEntity[0].replace(/[:]/g, ""),
        dataType,
        constrains,
        renderType: DiagramDataType.Property,
        className: PROPERTY_CLASSNAME,
      };
    })
    .filter((e) => e !== undefined);

  const results: EntityProperty[] | undefined = [];

  mappedEntity.forEach((element) => {
    if (element !== undefined) {
      results.push(element);
    }
  });

  return results;
};
