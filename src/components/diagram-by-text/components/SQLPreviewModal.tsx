import { Dialog } from "@src/components/common";
import { DBTypes } from "@src/consts";
import { FC, useCallback, useMemo } from "react";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import {
  MySQL,
  SQLDialect,
  MariaSQL,
  PostgreSQL,
  SQLite,
  MSSQL,
} from "@codemirror/lang-sql";
import { useEditorStore } from "@src/store";

interface SQLPreviewModalProps {
  dbType: DBTypes;
  onClose: () => void;
}

const language: Record<DBTypes, SQLDialect> = {
  MySql: MySQL,
  Mariadb: MariaSQL,
  Postgresql: PostgreSQL,
  Sqlite: SQLite,
  Transactsql: MSSQL,
};

export const SQLPreviewModal: FC<SQLPreviewModalProps> = ({
  dbType,
  onClose,
}) => {
  const { entities } = useEditorStore();

  const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    console.log("val:", value);
    viewUpdate;
  }, []);

  const sqlQuery = useMemo(() => {
    entities;
    const createDB = `CREATE DATABASE PetManagement;
USE PetManagement`;
    let createTables = "";

    entities?.map((entity) => {
      let properties = "";
      entity.property?.map((property) => {
        const constrains = property.constrains
          .split(",")
          .map((cons) => cons.toUpperCase())
          .join(" ");

        properties += `
                ${
                  property.name
                } ${property.dataType.toUpperCase()} ${constrains},
            `;
      });
      createTables += `
CREATE TABLE ${entity.property} (
        ${properties}
)
`;
    });

    return `
${createDB}${createTables}`
  }, [entities]);

  return (
    <Dialog
      onClose={onClose}
      opened={!!dbType}
      title={`Export to ${dbType}`}
      size="xl"
    >
      <CodeMirror
        value={sqlQuery}
        className="h-full"
        extensions={[language[dbType] ?? MySQL]}
        onChange={onChange}
      />
      ;
    </Dialog>
  );
};
