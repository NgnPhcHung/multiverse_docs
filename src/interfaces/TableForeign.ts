export interface RelationTable {
  tableName: string;
  tableKey: string;
}

export interface TableForeign {
  table: RelationTable;
  relatedTable: RelationTable;
}
