import {
  MariaSQL,
  MSSQL,
  MySQL,
  PostgreSQL,
  SQLDialect,
  SQLite,
} from "@codemirror/lang-sql";
import { Dialog } from "@src/components/common";
import { DBTypes } from "@src/consts";
import { useEditorStore } from "@src/store";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { FC, useCallback, useMemo } from "react";

interface SQLPreviewModalProps {
  dbType?: DBTypes;
  onClose: () => void;
}

const language: Record<DBTypes, SQLDialect> = {
  MySql: MySQL,
  Mariadb: MariaSQL,
  Postgresql: PostgreSQL,
  Sqlite: SQLite,
  MSSQL: MSSQL,
};

export const SQLPreviewModal: FC<SQLPreviewModalProps> = ({
  dbType,
  onClose,
}) => {
  const { entities } = useEditorStore();
  const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    viewUpdate;
  }, []);

  const sqlQuery = useMemo(() => {
    const createDB = `CREATE DATABASE PetManagement;
USE PetManagement
`;
    let createTables = "";
    entities?.forEach((entity) => {
      let properties = "";
      entity.property?.forEach((property) => {
        const constraints = property.constrains
          .split(",")
          .map((cons) => cons.toUpperCase())
          .join(" ");

        properties += `
  ${property.name} ${property.dataType.toUpperCase()} ${constraints},`;
      });

      createTables += `
CREATE TABLE ${entity.name} (${properties}
)`;
    });

    return `
${createDB}${createTables}`;
  }, [entities]);

  return (
    language[dbType!] && (
      <Dialog
        onClose={onClose}
        opened={!!dbType}
        title={`Export to ${dbType}`}
        size="xl"
      >
        <Dialog.Description className="h-[70vh] overflow-auto">
          <CodeMirror
            value={sqlQuery}
            extensions={[language[dbType!]]}
            onChange={onChange}
          />
        </Dialog.Description>
      </Dialog>
    )
  );
};
