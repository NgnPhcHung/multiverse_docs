import { Dialog, FileButton } from "@components";
import { useDisclosure } from "@hooks";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { ChangeEvent, useState } from "react";
import { formatFileSql } from "../diagram-document/formatFileSql";

export const ImportFile = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [importedText, setImportedText] = useState("");
  const handleOpenFile = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const fileContent = event.target.result as string;
          const sqlFormatted = formatFileSql(fileContent);
          console.log({ sqlFormatted });
          if (Object.keys(sqlFormatted).length) {
            setImportedText(JSON.stringify(sqlFormatted, null, 2).slice(1, -1));
            open();
          }
        }
      };

      reader.readAsText(file);
      input.value = "";
    }
  };

  return (
    <>
      <FileButton onChange={handleOpenFile}>Load file</FileButton>
      <Dialog title="Document" opened={opened} onClose={close} size="xl">
        <Dialog.Description>
          <MonacoEditor
            height="80%"
            className="[&_.cursor]:!hidden"
            theme="unknown-language-theme"
            language="unknown-language"
            value={importedText}
            options={{
              readOnly: true,
              minimap: {
                enabled: false,
              },
              lineNumbers: "off",
              cursorStyle: "line",
              renderLineHighlight: "none",
              hideCursorInOverviewRuler: true,
            }}
          />
        </Dialog.Description>
      </Dialog>
    </>
  );
};
