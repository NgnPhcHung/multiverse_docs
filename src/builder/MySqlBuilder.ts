import { TableReference } from "@src/interfaces";
import { SQLBuilder } from "./SQLBuilder";

export class MySQLBuilder implements SQLBuilder {
  private queries: string[] = [];
  private currentTable: string = "";
  private currentDatabase: string | null = null;

  startDatabase(databaseName: string): void {
    this.currentDatabase = `CREATE DATABASE ${databaseName};\nUSE ${databaseName};\n`;
    this.queries.push(this.currentDatabase);
  }

  startTable(tableName: string): void {
    this.currentTable = `CREATE TABLE \`${tableName}\` (\n`;
  }

  addColumn(columnName: string, dataType: string, constraints: string[]): void {
    const constraintString = constraints
      .join(" ")
      .replace("Primary", "PRIMARY KEY")
      .replace("AutoIncrement", "AUTO_INCREMENT")
      .replace("NotNull", "NOT NULL")
      .replace("Unique", "UNIQUE");
    this.currentTable += `  ${columnName} ${dataType} ${constraintString},\n`;
  }

  addPrimaryKey(keys: string[], tableName: string): void {
    let pk = "";
    if (keys.length === 1) {
      pk = `  PRIMARY KEY (${keys[0]}),`;
    } else {
      pk = `  CONSTRAINT PK_${tableName} PRIMARY KEY (${keys.map((k) => k).join(", ")}),`;
    }
    this.currentTable += pk;
  }

  endTable(): void {
    this.currentTable = this.currentTable.trim().slice(0, -1) + "\n);";
    this.queries.push(this.currentTable);
    this.currentTable = "";
  }

  addRelation({ sourceTable, referenceTable }: TableReference): void {
    const alterTable = `ALTER TABLE \`${sourceTable.tableName}\`
ADD FOREIGN KEY(\`${sourceTable.tableKey}\`) REFERENCES ${referenceTable.tableName}(${referenceTable.tableKey});`;
    this.queries.push(alterTable);
  }

  getResult(): string {
    return this.queries.join("\n");
  }
}
