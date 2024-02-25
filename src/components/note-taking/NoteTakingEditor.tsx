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
import Editor, { useMonaco } from "@monaco-editor/react";
import { useAppContext } from "AppContext";
import { CopyButton } from "components/common";
import * as monaco from "monaco-editor";
import { editor } from "monaco-editor";
import "monaco-themes/themes/Dracula.json";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "usehooks-ts";
const DEFAULT_HEIGHT = 178;

const PlainTextCodeEditorDescriptor: CodeBlockEditorDescriptor = {
  // always use the editor, no matter the language or the meta of the code block
  match: () => true, // return to args (language, meta) =>
  // You can have multiple editors with different priorities, so that there's a "catch-all" editor (with the lowest priority)
  priority: 0,
  // The Editor is a React component
  Editor: (props) => {
    const cb = useCodeBlockEditorContext();
    const { isDarkMode } = useAppContext();
    const valueGetter = useRef<editor.IStandaloneCodeEditor>();
    const monacoInUse = useMonaco();
    const [value, setValue] = useState("");
    const debounceEditorValue = useDebounce(value, 500);
    const handleEditorDidMount = useCallback(
      (
        _valueGetter: editor.IStandaloneCodeEditor
        // editorChange: typeof monaco
      ) => {
        valueGetter.current = _valueGetter;
        const container = document.getElementById("container");
        if (!container) {
          return;
        }

        const updateHeight = () => {
          const contentHeight =
            _valueGetter.getContentHeight() < DEFAULT_HEIGHT
              ? DEFAULT_HEIGHT
              : _valueGetter.getContentHeight();

          container.style.height = `${contentHeight + 40}px`;
          try {
            _valueGetter.layout({
              width: _valueGetter.getLayoutInfo().width,
              height: contentHeight,
            });
          } catch {
            console.log();
          }
        };
        _valueGetter.onDidContentSizeChange(updateHeight);
        _valueGetter.focus();
        updateHeight();
      },
      []
    );
    // override a word wrapping, disable and hide the scroll bars
    const optionsOverride: monaco.editor.IEditorConstructionOptions = {
      scrollBeyondLastLine: false,
      automaticLayout: true,
      minimap: { enabled: false },
      lineNumbers: "off",
      wordWrap:"on",
      padding: { top: 10 },
    };

    useEffect(() => {
      if (monacoInUse && isDarkMode) {
        import("monaco-themes/themes/Dracula.json")
          .then((data) => {
            monacoInUse.editor.defineTheme(
              "dracula",
              data as monaco.editor.IStandaloneThemeData
            );
          })
          .then(() => monacoInUse.editor.setTheme("dracula"));
      }
    }, [monacoInUse, isDarkMode]);

    useEffect(() => {
      cb.setCode(debounceEditorValue ?? "");
    }, [cb, debounceEditorValue]);

    return (
      <div
        onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}
        id="container"
        className="m-2 w-full relative group/copyButton"
      >
        <div className="absolute top-8 right-2 z-onEditor hidden group-hover/copyButton:block">
          <CopyButton dataToCopy={value} />
        </div>
        <Editor
          options={optionsOverride}
          onMount={handleEditorDidMount}
          defaultLanguage={props.language ?? "typescript"}
          className="w-full pt-6 rounded-md z-10 mb-6"
          value=""
          theme={isDarkMode ? "dracula" : "vs"}
          onChange={(value) => {
            setValue(value ?? "");
          }}
        />
      </div>
    );
  },
};

export const NoteTakingEditor = () => {
  return (
    <>
      {/**
       *  [&>*:first-child]:bg-secondaryHover [&>*:first-child]:text-primary
       *
       */}
      <MDXEditor
        className="mx-4 [&>div]:w-fit [&>*:first-child]:bg-transparent  [&>.mdxeditor-root-contenteditable]:bg-secondaryHover [&>.mdxeditor-root-contenteditable]:rounded-md [&>.mdxeditor-root-contenteditable]:mt-2 [&>.mdxeditor-root-contenteditable]:px-4 [&>.mdxeditor-root-contenteditable]:w-full"
        markdown=""
        contentEditableClassName="text-primary"
        // onChange={(value) => console.log(value)}
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
              <div className="flex space-x-2 space-y-2 fixed bottom-5 left-auto bg-secondaryHover rounded-md text-primary p-2 flex-wrap items-center justify-center [&_svg]:w-4 [&_svg]:h-4 lg:[&_svg]:w-5 lg:[&_svg]:h-5 ">
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
                      fallback: () => <InsertCodeBlock />,
                    },
                  ]}
                />
              </div>
            ),
          }),
        ]}
      />
    </>
  );
};
