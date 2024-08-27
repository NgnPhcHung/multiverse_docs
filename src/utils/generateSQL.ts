import { SQLBuilderFactory } from "@src/builder";
import { DBTypes, EditorKeywords } from "@src/consts";
import { EntityStore, TableReference } from "@src/interfaces";

export function generateSQL(
  dbType: DBTypes,
  schema: EntityStore[],
  relation?: TableReference[]
): string {
  const builder = SQLBuilderFactory.getBuilder(dbType);
  builder.startDatabase("PetManagement");
  schema.forEach((table) => {
    const pks: string[] = [];
    builder.startTable(table.name);
    table.properties?.forEach((column) => {
      const constraints = column.constrains
        .split(",")
        .map((cons) => cons.trim());
      if (constraints.includes(EditorKeywords.Primary)) {
        pks.push(column.name);
        constraints.splice(constraints.indexOf(EditorKeywords.Primary), 1);
      }
      builder.addColumn(column.name, column.dataType, constraints);
    });
    builder.addPrimaryKey(pks, table.name);
    builder.endTable();
  });

  relation?.forEach((rel) => {
    builder.addRelation(rel);
  });
  return builder.getResult();
}
