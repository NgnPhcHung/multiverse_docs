export interface RelationTable {
  tableName: string;
  tableKey: string;
}

export interface TableReference {
  sourceTable: RelationTable;
  referenceTable: RelationTable;
}
