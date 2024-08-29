import { PROPERTY_CLASSNAME } from "@src/components/editor/editorSettings";
import {
  Constrains,
  DiagramDataType,
  EntityProperty
} from "@src/interfaces";

export const formatStringToEntityProperty = (
  entityString?: string
): EntityProperty[] | undefined => {
  if (!entityString) return;

  const str = entityString;
  const entities = str.split(",");
  const mappedEntity: undefined | EntityProperty[] = entities
    .map<EntityProperty | undefined>((entity) => {
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
        classNames: {
          property: PROPERTY_CLASSNAME,
        },
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
