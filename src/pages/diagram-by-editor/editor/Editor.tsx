/* eslint-disable react-hooks/exhaustive-deps */
import { useSocketContext } from "@components";
import { useDarkMode, useDebounce } from "@hooks";
import LiveblocksProvider from "@liveblocks/yjs";
import { Editor as MonacoEditor, useMonaco } from "@monaco-editor/react";
import { TableType, useDiagramStore, useEditorStore } from "@store";
import { TypedLiveblocksProvider, useRoom } from "config";
import * as monaco from "monaco-editor";
import { editor } from "monaco-editor";
import { useCallback, useEffect, useState } from "react";
import { MonacoBinding } from "y-monaco";
import { Awareness } from "y-protocols/awareness";
import * as Y from "yjs";
import { EditorCursor } from "./EditorCursor";
import { EditorSkeleton } from "./EditorSkeleton";
import { useEditorFormatter } from "./editorFunctions";
import {
  defaultEditorValue,
  regex,
  setEditorTheme,
  settingMonacoEditor,
} from "./editorSettings";

export const Editor = () => {
  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();
  const [loading, setLoading] = useState(true);
  const [editorValues, setEditorValues] = useState("");
  const { isDarkMode } = useDarkMode();
  const room = useRoom();
  const { setProvider, provider } = useSocketContext();
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
      setEditorRef(editor);
      const editorModel = editor.getModel();
      if (editorModel !== null) {
        const tableValues: TableType[] = [];
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
    },
    []
  );

  useEffect(() => {
    if (debouncedValue) onFormat(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    if (!monaco) {
      setLoading(true);
      return;
    }
    settingMonacoEditor(monaco, isDarkMode);
    setLoading(false);
  }, [monaco]);

  useEffect(() => {
    if (!monaco) {
      setLoading(true);
      return;
    }
    setEditorTheme(monaco, isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    let yProvider: TypedLiveblocksProvider;
    let yDoc: Y.Doc;
    let binding: MonacoBinding;

    if (editorRef) {
      yDoc = new Y.Doc();
      const yText = yDoc.getText("monaco");
      yProvider = new LiveblocksProvider(room, yDoc);
      setProvider(yProvider);

      binding = new MonacoBinding(
        yText,
        editorRef.getModel() as editor.ITextModel,
        new Set([editorRef]),
        yProvider.awareness as Awareness
      );
    }
    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
      binding?.destroy();
    };
  }, [editorRef, room, setProvider]);

  useEffect(() => {
    return () => {
      setNode([]);
      setEdges([]);
    };
  }, [setNode, setEdges]);

  return (
    <div className="w-full h-full">
      {provider ? <EditorCursor yProvider={provider} /> : null}
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
