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

const PlainTextCodeEditorDescriptor: CodeBlockEditorDescriptor = {
  // always use the editor, no matter the language or the meta of the code block
  match: (language, meta) => true,
  // You can have multiple editors with different priorities, so that there's a "catch-all" editor (with the lowest priority)
  priority: 0,
  // The Editor is a React component
  Editor: (props) => {
    const cb = useCodeBlockEditorContext();
    const { isDarkMode } = useAppContext();
    console.log(cb);
    return (
      <div onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
        <Editor
          defaultLanguage={props.language ?? "typescript"}
          width="90%"
          height={200}
          className="h-full"
          value=""
          theme={isDarkMode ? "vs" : "vs-dark"}
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
        markdown="Hello world"
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
