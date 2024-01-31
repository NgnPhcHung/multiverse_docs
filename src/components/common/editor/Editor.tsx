/* eslint-disable react-hooks/exhaustive-deps */
import { Editor as MonacoEditor, useMonaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { MonacoBinding } from "y-monaco";
import { EditorSkeleton } from "./EditorSkeleton";
import { useEditorFormatter } from "./editorFunctions";
import {
  defaultEditorValue,
  regex,
  settingMonacoEditor,
} from "./editorSettings";

export const Editor = () => {
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [editorValues, setEditorValues] = useState("");

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

  const handleMonacoEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    const editorModel = editor.getModel();
    if (editorModel !== null) {
      const type = doc.getText("monaco");
      new MonacoBinding(
        type,
        editorModel,
        new Set([editor]),
        provider.awareness
      );

      const tableValues: TableType[] = [];
      if (!editorRef.current) return;
      const formattedValueFormEditor = formatValue(editor.getValue());
      formattedValueFormEditor?.forEach((element) => {
        const regexValue = regex.exec(element);
        if (regexValue !== null) {
          const tableName = regexValue[1];
          const tableEntity = regexValue[2];
          tableValues.push({ tableName, tableEntity });
        }
      });
      setEditorContent(tableValues);
      editor.focus();
      setDefaultValues();
    }
  };

  useEffect(() => {
    if (debouncedValue) onFormat(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    if (!monaco) {
      setLoading(true);
      return;
    }
    settingMonacoEditor(monaco);
    setLoading(false);
  }, [monaco]);

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
