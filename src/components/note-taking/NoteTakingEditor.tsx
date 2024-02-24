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

const DEFAULT_HEIGHT = 121;

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
              width:_valueGetter.getLayoutInfo().width,
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
      padding: { top: 10 },
      scrollbar: {
        vertical: "hidden",
        horizontal: "hidden",
      },
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
        // monaco.editor.defineTheme("monokai-bright").then(_ => monaco.editor.setMonacoTheme("monokai-bright"));
      }
    }, [monacoInUse, isDarkMode]);

    useEffect(() => {
      cb.setCode(debounceEditorValue ?? "");
    }, [cb, debounceEditorValue]);

    return (
      <div
        onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}
        id="container"
        className="m-2 w-[96vw] relative group/copyButton"
      >
        {/* <span className="absolute top-0 left-2 font-semibold">
          {props.language ?? "typescript"}
        </span> */}
        <div className="absolute top-8 right-2 z-onEditor hidden group-hover/copyButton:block">
          <CopyButton dataToCopy={value} />
        </div>
        <Editor
        width="95%"
          options={optionsOverride}
          onMount={handleEditorDidMount}
          defaultLanguage={props.language ?? "typescript"}
          className="min-h-24 max-h-full pt-6 overflow-hidden rounded-md z-editor"
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
      <MDXEditor
        className="mt-4 mx-4 [&>div]:w-fit [&>*:first-child]:bg-secondaryHover [&>*:first-child]:text-primary [&>.mdxeditor-root-contenteditable]:bg-secondaryHover [&>.mdxeditor-root-contenteditable]:rounded-md [&>.mdxeditor-root-contenteditable]:mt-2 [&>.mdxeditor-root-contenteditable]:px-4 [&>.mdxeditor-root-contenteditable]:w-full "
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
              <>
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
