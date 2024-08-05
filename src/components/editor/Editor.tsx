import { Editor as MonacoEditor, useMonaco } from "@monaco-editor/react";
import useDebouncedCallback from "@src/hooks/useDebouncedCallback";
import { useAppStore } from "@src/store";
import { TableType, useEditorStore } from "@store/editorStore";
import * as monaco from "monaco-editor";
import { useCallback, useEffect, useState } from "react";
import { EditorSkeleton } from "./EditorSkeleton";
import { useEditorFormatter } from "./editorFunctions";
import { regex, setEditorTheme, settingMonacoEditor } from "./editorSettings";

export const Editor = () => {
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useAppStore();

  // const [value, setValue] = useState("");
  const monaco = useMonaco();
  const { onFormat, formatValue } = useEditorFormatter();
  const { editorFileContent, setEditorContent } = useEditorStore();

  const handleMonacoEditorDidMount = useCallback(
    (editor: monaco.editor.IStandaloneCodeEditor) => {
      const editorModel = editor.getModel();
      if (editorModel !== null) {
        const tableValues: TableType[] = [];
        const formattedValueFormEditor = formatValue(editor.getValue());
        formattedValueFormEditor?.forEach((element) => {
          const regexValue = regex.exec(element);
          if (regexValue !== null) {
            const tableName = regexValue[1];
            const tableEntity = regexValue[2];
            tableValues.push({
              tableName,
              tableEntity,
              position: {
                x: 225,
                y: 225,
              },
              id: tableName,
              data: { tableName, tableEntity },
            });
          }
        });
        setEditorContent(editor.getValue());
        editor.focus();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleChange = useDebouncedCallback((changedValue) => {
    setEditorContent(changedValue as string);
  }, 500);

  useEffect(() => {
    if (editorFileContent) onFormat(editorFileContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorFileContent]);

  useEffect(() => {
    if (!monaco) {
      setLoading(true);
      return;
    }
    settingMonacoEditor(monaco, isDarkMode);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monaco]);

  useEffect(() => {
    if (!monaco) {
      setLoading(true);
      return;
    }
    setEditorTheme(monaco, isDarkMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  return (
    <div className="w-full h-full">
      {loading ? (
        <EditorSkeleton />
      ) : (
        <MonacoEditor
          onMount={handleMonacoEditorDidMount}
          theme="unknown-language-theme"
          language="unknown-language"
          value={editorFileContent}
          onChange={handleChange}
        />
      )}
    </div>
  );
};
