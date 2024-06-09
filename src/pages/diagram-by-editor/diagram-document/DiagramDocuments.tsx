import { Button, Dialog } from "@components";
import { useDisclosure } from "@hooks";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { documentText } from "./document";

export const DiagramDocuments = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  const handleMonacoEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    const editorModel = editor.getModel();
    if (editorModel !== null) {
      editor.focus();
    }
  };
  return (
    <>
      <div>
        <Button onClick={toggle}>Documents</Button>
      </div>

      <Dialog title="Document" opened={opened} onClose={close} size="xl">
        <Dialog.Description>
          <MonacoEditor
            height="80%"
            className="[&_.cursor]:!hidden"
            onMount={handleMonacoEditorDidMount}
            theme="unknown-language-theme"
            language="unknown-language"
            value={documentText}
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
