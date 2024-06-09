interface Column {
  type: string;
  isNotNull: boolean;
  isUnique: boolean;
}

interface Table {
  columns: { [columnName: string]: Column };
}

export function formatFileSql(sqlCode: string): { [tableName: string]: Table } {
  const createTableRegex = /CREATE\s+TABLE\s+`?(\w+)`?\s*\(([\s\S]+?)\);/g;
  const columnRegex =
    /`?(\w+)`?\s+(\w+(?:\(\d+(?:,\s*\d+)?\))?)\s*(?:(NOT\s+NULL)|(UNIQUE))?/g;
  const tables: { [tableName: string]: Table } = {};

  let match: RegExpExecArray | null;
  while ((match = createTableRegex.exec(sqlCode)) !== null) {
    console.log("matches"); // Debugging
    const tableName = match[1];
    const tableDefinition = match[2];
    const columns: { [columnName: string]: Column } = {};

    let columnMatch: RegExpExecArray | null;
    while ((columnMatch = columnRegex.exec(tableDefinition)) !== null) {
      const columnName = columnMatch[1];
      const columnType = columnMatch[2];
      const isNotNull = !!columnMatch[3];
      const isUnique = !!columnMatch[4];
      columns[columnName] = { type: columnType, isNotNull, isUnique };
    }

    tables[tableName] = { columns };
  }

  console.log(tables); // Debugging
  return tables;
}
