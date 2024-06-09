interface Reference {
  table: string;
  column: string;
  relationship: string;
}

export interface ColumnDefinition {
  type: string;
  isNotNull: boolean;
  isUnique: boolean;
  primaryKey: boolean;
  references?: Reference;
}

export interface TableDefinition {
  columns: { [key: string]: ColumnDefinition };
}

interface Schema {
  [key: string]: TableDefinition;
}

export function parseSchema(schema: string): Schema {
  const result: Schema = {};

  const tableRegex = /Create\s+(\w+)\s*\(([^)]+)\)/g;
  let match: RegExpExecArray | null;

  while ((match = tableRegex.exec(schema)) !== null) {
    const tableName = match[1];
    const columnsString = match[2];

    const columns: { [key: string]: ColumnDefinition } = {};
    const columnRegex = /\s*(\w+)\s*:\s*(\w+)(\s+unique)?(\s+PrimaryKey)?/g;
    let columnMatch: RegExpExecArray | null;

    while ((columnMatch = columnRegex.exec(columnsString)) !== null) {
      const columnName = columnMatch[1];
      const columnType = columnMatch[2];
      const isUnique = !!columnMatch[3];
      const isPrimaryKey = !!columnMatch[4];

      columns[columnName] = {
        type: columnType,
        isNotNull: false,
        isUnique: isUnique,
        primaryKey: isPrimaryKey,
      };
    }

    result[tableName] = { columns };
  }
  return parseForeignKeys(schema, result);
}

export function parseForeignKeys(schema: string, result: Schema): Schema {
  const foreignKeyRegex =
    /Foreign\s+(\w+)\.(\w+)\s*(>>|--|<<|<>)\s*(\w+)\.(\w+)/g;
  let match: RegExpExecArray | null;

  while ((match = foreignKeyRegex.exec(schema)) !== null) {
    const sourceTable = match[1];
    const sourceColumn = match[2];
    const relationship = match[3];
    const targetTable = match[4];
    const targetColumn = match[5];

    if (result[sourceTable] && result[sourceTable].columns[sourceColumn]) {
      result[sourceTable].columns[sourceColumn].references = {
        table: targetTable,
        column: targetColumn,
        relationship: mapRelationshipType(relationship),
      };
    }
  }
  return result;
}

function mapRelationshipType(relationship: string): string {
  switch (relationship) {
    case ">>":
      return "many-to-one";
    case "--":
      return "one-to-one";
    case "<<":
      return "one-to-many";
    case "<>":
      return "many-to-many";
    default:
      return "unknown";
  }
}
