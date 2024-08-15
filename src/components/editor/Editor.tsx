import { Editor as MonacoEditor, useMonaco } from "@monaco-editor/react";
import useDebouncedCallback from "@src/hooks/useDebouncedCallback";
import { useAppStore } from "@src/store";
import { useEditorStore } from "@store/editorStore";
import * as monaco from "monaco-editor";
import { useCallback, useEffect, useState } from "react";
import { EditorSkeleton } from "./EditorSkeleton";
import { useEditorFormatter } from "./editorFunctions";
import { setEditorTheme, settingMonacoEditor } from "./editorSettings";

export const Editor = () => {
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useAppStore();

  // const [value, setValue] = useState("");
  const monaco = useMonaco();
  const { onFormat } = useEditorFormatter();
  const { editorFileContent, setEditorContent } = useEditorStore();

  const handleMonacoEditorDidMount = useCallback(
    (editor: monaco.editor.IStandaloneCodeEditor) => {
      const editorModel = editor.getModel();
      if (editorModel !== null) {
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
