import {
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  CodeBlockEditorDescriptor,
  ConditionalContents,
  CreateLink,
  InsertCodeBlock,
  InsertTable,
  ListsToggle,
  MDXEditor,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  toolbarPlugin,
  useCodeBlockEditorContext,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { Editor } from "@monaco-editor/react";
import { useAppContext } from "AppContext";
import * as monaco from "monaco-editor";
import { editor } from "monaco-editor";
import { useCallback, useRef, useState } from "react";

const MAX_HEIGHT = 600;
const MIN_COUNT_OF_LINES = 9;
const LINE_HEIGHT = 20;
const DEFAULT_HEIGHT = 170;

const PlainTextCodeEditorDescriptor: CodeBlockEditorDescriptor = {
  // always use the editor, no matter the language or the meta of the code block
  match: (language, meta) => true,
  // You can have multiple editors with different priorities, so that there's a "catch-all" editor (with the lowest priority)
  priority: 0,
  // The Editor is a React component
  Editor: (props) => {
    const cb = useCodeBlockEditorContext();
    const { isDarkMode } = useAppContext();
    const [height, setHeight] = useState(DEFAULT_HEIGHT);
    const valueGetter = useRef<editor.IStandaloneCodeEditor>();

    const handleEditorChange = useCallback(() => {
      const countOfLines =
        valueGetter.current?.getValue()?.split("\n").length ?? 0;
      if (countOfLines >= MIN_COUNT_OF_LINES) {
        const currentHeight = countOfLines * LINE_HEIGHT;
        if (MAX_HEIGHT > currentHeight) {
          setHeight(currentHeight);
        }
      }
    }, []);

    const handleEditorDidMount = useCallback(
      (
        _valueGetter: editor.IStandaloneCodeEditor,
        editorChange: typeof monaco
      ) => {
        console.log(editorChange);
        // valueGetter.current = _valueGetter;
        // const lineHeight = editor.EditorOption.lineHeight;
        // const lineCount =
        //   editor.getModel(new editorChange.Uri())?.getLineCount() || 1;
        // const height =
        // editorChange.editor.(lineCount + 1) + lineHeight;
      },
      [handleEditorChange]
    );

    return (
      <div
        onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}
        className="h-full relative"
      >
        <span className="absolute top-0 left-2 font-semibold">
          {props.language ?? "typescript"}
        </span>
        <Editor
          options={{
            automaticLayout: true,
          }}
          onMount={handleEditorDidMount}
          defaultLanguage={props.language ?? "typescript"}
          width="90%"
          height={height}
          className="min-h-24 max-h-full pt-6 overflow-hidden"
          value=""
          theme={isDarkMode ? "vs-dark" : "vs"}
          onChange={(value) => cb.setCode(value ?? "")}
        />
      </div>
    );
  },
};

export const NoteTakingEditor = () => {
  return (
    <>
      <MDXEditor
        markdown=""
        contentEditableClassName="text-primary"
        onChange={(value) => console.log(value)}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          tablePlugin(),
          codeBlockPlugin({
            codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor],
            defaultCodeBlockLanguage: "typescript",
          }),
          codeMirrorPlugin({
            codeBlockLanguages: { js: "JavaScript", ts: "TypeScript" },
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <InsertTable />
                <CreateLink />
                <ListsToggle />
                <ConditionalContents
                  options={[
                    {
                      when: (editor) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },

                    {
                      fallback: () => (
                        <>
                          <InsertCodeBlock />
                        </>
                      ),
                    },
                  ]}
                />
              </>
            ),
          }),
        ]}
      />
    </>
  );
};
