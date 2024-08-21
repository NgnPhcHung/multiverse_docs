import { TableReference } from "@src/interfaces";

export interface SQLBuilder {
  startDatabase(databaseName: string): void;
  startTable(tableName: string): void;
  addColumn(columnName: string, dataType: string, constraints: string[]): void;
  addPrimaryKey(keys: string[], tableName: string): void;
  endTable(): void;
  addRelation(references: TableReference): void;
  getResult(): string;
}
