import {
  MariaSQL,
  MSSQL,
  MySQL,
  PostgreSQL,
  SQLDialect,
  SQLite,
} from "@codemirror/lang-sql";
import { Button, Dialog, TextInput } from "@src/components/common";
import { DBTypes } from "@src/consts";
import useDebouncedCallback from "@src/hooks/useDebouncedCallback";
import { EntityGenerator } from "@src/orm/typeorm/ConvertToTypeorm";
import { useEditorStore } from "@src/store";
import { generateSQL } from "@src/utils";
import CodeMirror from "@uiw/react-codemirror";
import { FC, useCallback, useEffect, useState } from "react";

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
  const { entities: schema, references: relation } = useEditorStore();
  const [sqlResult, setSqlResult] = useState("");
  const [tableName, setTableName] = useState("untitledDatabase");

  const onChange = useCallback(() => {}, []);

  const handleChange = useDebouncedCallback((changedValue) => {
    setTableName(changedValue as string);
  }, 500);

  useEffect(() => {
    if (!dbType || !schema?.length) return;
    console.log(relation);
    try {
      const builderResult = generateSQL(dbType, schema, relation);
      setSqlResult(builderResult);
    } catch (error) {
      console.error("Error generating SQL:", error);
      setSqlResult("Error generating SQL. Please try again.");
    }
  }, [dbType, relation, schema]);

  const handleSaveFile = () => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(sqlResult)
    );
    element.setAttribute("download", tableName + ".sql");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const typeorm = () => {
    if(!schema?.length) return 

    const generator = new EntityGenerator();
    const typeOrmEntities = generator.generateEntity(schema);
    console.log(typeOrmEntities);
  };
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
            value={sqlResult}
            extensions={[language[dbType!]]}
            onChange={onChange}
          />
        </Dialog.Description>
        <div className="flex items-center space-x-3 mt-2">
          <TextInput value={tableName} onChange={handleChange} />
          <Button
            className={{
              button: "!w-24 break-keep",
            }}
            onClick={handleSaveFile}
          >
            Save to file
          </Button>
          <Button
            className={{
              button: "!w-24 break-keep",
            }}
            onClick={typeorm}
          >
            save to orm
          </Button>
        </div>
      </Dialog>
    )
  );
};
