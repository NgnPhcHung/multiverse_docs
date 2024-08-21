import { DBTypes } from "@src/consts";
import { MySQLBuilder } from "./MySqlBuilder";
import { SQLBuilder } from "./SQLBuilder";

export class SQLBuilderFactory {
  static getBuilder(dbType: DBTypes): SQLBuilder {
    switch (dbType) {
      case DBTypes.MYSQL:
        return new MySQLBuilder();
      //   case "PostgreSQL":
      //     return new PostgreSQLBuilder();
      //   case "MSSQL":
      //     return new MSSQLBuilder();
      default:
        throw new Error("Unsupported database type");
    }
  }
}
