import {
  EntityStore,
  RelationTable,
  SQLError,
  TableError,
  TableReference,
} from "@src/interfaces";

class SQLErrorCheck {
  errors: TableError[] = [];
  entities: EntityStore[] = [];
  relations: TableReference[] = [];

  constructor(entities?: EntityStore[], relations?: TableReference[]) {
    this.entities = entities || [];
    this.relations = relations || [];
    this.calls();
  }

  private checkTableInForeign() {
    const tableNames = this.getForeignData("tableName");

    const entityNames = new Set(this.entities.map((en) => en.name));
    const notIncluded = tableNames.filter((rs) => !entityNames.has(rs));

    if (notIncluded.length) {
      notIncluded.forEach((data) => {
        this.errors.push({
          title: SQLError.TableNotFound,
          message: `Reference to table \`${data}\` not found`,
        });
      });
    }
  }

  private checkKeysOfForeign() {
    const entityProperties = new Map();

    this.entities.forEach((entity) => {
      entityProperties.set(
        entity.name,
        new Set(entity.properties?.map((prop) => prop.name))
      );
    });

    this.relations.forEach((rl) => {
      const refProp = entityProperties.get(rl.referenceTable.tableName);
      const srcProp = entityProperties.get(rl.sourceTable.tableName);

      if (refProp && !refProp.has(rl.referenceTable.tableKey)) {
        this.addError(rl.referenceTable.tableKey, rl.referenceTable.tableName);
      }
      if (srcProp && !srcProp.has(rl.sourceTable.tableKey)) {
        this.addError(rl.sourceTable.tableKey, rl.sourceTable.tableName);
      }
    });
  }
  private addError(tableKey: string, tableName: string) {
    this.errors.push({
      title: SQLError.NonExistKey,
      message: `In entity '${tableName}', reference to key \`${tableKey}\` not found`,
    });
  }

  private getForeignData(key: keyof RelationTable) {
    return [
      ...new Set(
        this.relations.flatMap((cur) => [
          cur.referenceTable[key],
          cur.sourceTable[key],
        ])
      ),
    ];
  }

  private calls() {
    this.checkTableInForeign();
    this.checkKeysOfForeign();
  }
}

export const checkSQLErrors = ({
  relations,
  entities,
}: {
  entities?: EntityStore[];
  relations?: TableReference[];
}) => {
  const checker = new SQLErrorCheck(entities, relations);

  return checker.errors;
};
