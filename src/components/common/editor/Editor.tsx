import LiveblocksProvider from "@liveblocks/yjs";
import { Editor as MonacoEditor, useMonaco } from "@monaco-editor/react";
import { TypedLiveblocksProvider, useRoom } from "config";
import * as monaco from "monaco-editor";
import { editor } from "monaco-editor";
import { useCallback, useEffect, useState } from "react";
import { TableType, useEditorStore } from "store";
import { useDebounce } from "usehooks-ts";
import { MonacoBinding } from "y-monaco";
import { Awareness } from "y-protocols/awareness";
import * as Y from "yjs";
import { EditorSkeleton } from "./EditorSkeleton";
import { useEditorFormatter } from "./editorFunctions";
import {
  defaultEditorValue,
  regex,
  settingMonacoEditor,
} from "./editorSettings";

export const Editor = () => {
  const [loading, setLoading] = useState(true);
  const [editorValues, setEditorValues] = useState("");
  const room = useRoom();
  const [provider, setProvider] = useState<TypedLiveblocksProvider>();

  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();

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
      // const type = doc.getText("monaco");
      // new MonacoBinding(
      //   type,
      //   editorModel,
      //   new Set([editor]),
      //   provider.awareness
      // );

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

  // Set up Liveblocks Yjs provider and attach Monaco editor
  useEffect(() => {
    let yProvider: TypedLiveblocksProvider;
    let yDoc: Y.Doc;
    let binding: MonacoBinding;

    if (editorRef) {
      yDoc = new Y.Doc();
      const yText = yDoc.getText("monaco");
      yProvider = new LiveblocksProvider(room, yDoc);
      setProvider(yProvider);

      // Attach Yjs to Monaco
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
  }, [editorRef, room]);

  const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
    setEditorRef(e);
  }, []);

  return (
    <div className="w-full h-full">
      {/* {provider ? <Cursors yProvider={provider} /> : null} */}
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
