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
// import { useEditorFormatter } from "./useEditorFormatter";
import { RelationType } from "@interfaces";
import { getKeyFromEnum } from "@utils";
import { Edge, Node } from "reactflow";
import { parseSchema } from "./editorConverter";
import {
  defaultEditorValue,
  regex,
  setEditorTheme,
  settingMonacoEditor,
} from "./editorSettings";
import { useEditorFormatter } from "./useEditorFormatter";

export const Editor = () => {
  const room = useRoom();
  const monaco = useMonaco();
  const { isDarkMode } = useDarkMode();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const { setNode, setEdges, nodes } = useDiagramStore();
  const { formatValue } = useEditorFormatter();
  const debouncedValue = useDebounce<string>(value, 500);
  const { setProvider, provider } = useSocketContext();
  const [editorValues, setEditorValues] = useState("");
  const { editorFileContent, setEditorContent } = useEditorStore();
  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();

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
    if (debouncedValue.length) {
      const schema = parseSchema(debouncedValue);
      const edgeArr: Edge[] = [];

      const nodesArr: Node[] = Object.entries(schema).map(([key, value]) => {
        const existingNodes = nodes.find((node) => node.id === key);

        value.references?.forEach((refer) => {
          edgeArr.push({
            id: `${value.tableName}.${refer.sourceColumn}-${refer.table}.${refer.targetColumn}`,
            source: value.tableName,
            sourceHandle: `${value.tableName}.${refer.sourceColumn}`,
            target: refer.table,
            targetHandle: `${refer.table}.${refer.targetColumn}`,
            type: "floating",
            data: {
              label: getKeyFromEnum(refer.relationship, RelationType),
            },
          });
        });

        if (existingNodes) {
          return {
            ...existingNodes,
            data: {
              [key]: value,
            },
          };
        }

        return {
          id: key,
          type: "tables",
          data: {
            [key]: value,
          },
          position: { x: 125, y: 22 },
        };
      });
      setEdges([...edgeArr]);
      setNode(nodesArr);
    }

    return () => {
      setNode([]);
    };
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
