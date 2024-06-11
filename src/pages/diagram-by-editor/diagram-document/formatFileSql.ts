interface Reference {
  table: string;
  sourceColumn: string;
  targetColumn: string;
  relationship: string;
}

interface Column {
  type: string;
  isNotNull: boolean;
  isUnique: boolean;
  primaryKey: boolean;
}

interface Table {
  columns: { [columnName: string]: Column };
  references?: Reference[];
  tableName: string;
}

export function formatFileSql(sqlCode: string): { [tableName: string]: Table } {
  const createTableRegex = /CREATE\s+TABLE\s+`?(\w+)`?\s*\(([\s\S]+?)\);/g;
  const columnRegex =
    /`?(\w+)`?\s+(\w+(?:\(\d+(?:,\s*\d+)?\))?)\s*(?:(NOT\s+NULL)|(UNIQUE)|(PRIMARY\s+KEY))?/g;
  const foreignKeyRegex =
    /FOREIGN\s+KEY\s*\(`?(\w+)`?\)\s*REFERENCES\s+`?(\w+)`?\s*\(`?(\w+)`?\)/gi;
  const tables: { [tableName: string]: Table } = {};

  let match: RegExpExecArray | null;
  while ((match = createTableRegex.exec(sqlCode)) !== null) {
    const tableName = match[1];
    const tableDefinition = match[2];
    const columns: { [columnName: string]: Column } = {};

    let columnMatch: RegExpExecArray | null;
    while ((columnMatch = columnRegex.exec(tableDefinition)) !== null) {
      const columnName = columnMatch[1];
      const columnType = columnMatch[2];
      const isNotNull = !!columnMatch[3];
      const isUnique = !!columnMatch[4];
      const primaryKey = !!columnMatch[5];
      columns[columnName] = {
        type: columnType,
        isNotNull,
        isUnique,
        primaryKey,
      };
    }

    tables[tableName] = { tableName, columns };
  }

  while ((match = foreignKeyRegex.exec(sqlCode)) !== null) {
    const sourceColumn = match[1];
    const targetTable = match[2];
    const targetColumn = match[3];
    // Find the table that defines this foreign key
    for (const tableName in tables) {
      if (tables[tableName].columns[sourceColumn]) {
        tables[tableName].references = [
          ...(tables[tableName].references || []),
        ];
        tables[tableName].references?.push({
          table: targetTable,
          sourceColumn,
          targetColumn,
          relationship: "one-to-one",
        });
      }
    }
  }

  return tables;
}
