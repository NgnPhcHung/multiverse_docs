import { Editor as MonacoEditor, useMonaco } from "@monaco-editor/react";
import { useDiagramStore } from "@store/diagramStore";
import { TableType, useEditorStore } from "@store/editorStore";
import * as monaco from "monaco-editor";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { EditorSkeleton } from "./EditorSkeleton";
import { useEditorFormatter } from "./editorFunctions";
import {
  defaultEditorValue,
  regex,
  setEditorTheme,
  settingMonacoEditor,
} from "./editorSettings";
import { useAppStore } from "@src/store";

export const Editor = () => {
  const [loading, setLoading] = useState(true);
  const [editorValues, setEditorValues] = useState("");
  const { isDarkMode } = useAppStore();
  const { setNode, setEdges } = useDiagramStore();

  const [value, setValue] = useState("");
  const debouncedValue = useDebounce<string>(value, 500);
  const monaco = useMonaco();
  const { onFormat, formatValue } = useEditorFormatter();
  const { editorFileContent, setEditorContent } = useEditorStore();

  const onChange = (changedValue?: string) => {
    if (!changedValue) return;
    setValue(changedValue);
  };

  const setDefaultValues = () => {
    editorFileContent
      ? setEditorValues(editorFileContent.toString())
      : setEditorValues(defaultEditorValue);
  };

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
        setEditorContent(tableValues);
        editor.focus();
        setDefaultValues();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (debouncedValue) onFormat(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

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

  useEffect(() => {
    return () => {
      // setNode([]);
      setEdges([]);
    };
  }, [setNode, setEdges]);

  return (
    <div className="w-full h-full">
      {loading ? (
        <EditorSkeleton />
      ) : (
        <MonacoEditor
          onMount={handleMonacoEditorDidMount}
          theme="unknown-language-theme"
          language="unknown-language"
          value={editorValues}
          onChange={onChange}
        />
      )}
    </div>
  );
};
