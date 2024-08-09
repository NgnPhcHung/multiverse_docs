import { Constrains, EntityProperty } from "@src/interfaces";

export const formatStringToEntityProperty = (
  entityString?: string
): EntityProperty[] | undefined => {
  if (!entityString) return;
  const str = entityString.split(")")[0];
  const entities = str.split(",");
  const mappedEntity = entities
    .map((entity) => {
      const noWhiteSpaceEntity = entity.replace(/\s+/g, " ").trim().split(" ");
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
  return results;
};
