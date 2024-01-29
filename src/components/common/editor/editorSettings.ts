import * as monacoType from "monaco-editor";

export const defaultEditorValue = `Create user ( 
  id: char unique PrimaryKey,
  firstname: varchar,
  lastname: varchar,
  dateofbirth: date,
  address: varchar,
)
Create dogtor ( 
  id: char PrimaryKey,
  firstname: char,
)
Create host ( 
  id: char PrimaryKey,
  address: varchar,
)

Foreign host.id >> user.id,
Foreign dogtor.firstname -- host.address
`;

export const settingMonacoEditor = (monaco: typeof monacoType) => {
  const keywords = ["Create", "PrimaryKey", "Foreign"];
  const typeKeywords = [
    "char",
    "varchar",
    "bool",
    "date",
    "datetime",
    "number",
  ];
  const constrainKeywords = ["NOT NULL", "not null", "UNIQUE", "unique"];
  monaco.languages.register({ id: "unknown-language" });
  monaco.languages.setMonarchTokensProvider("unknown-language", {
    keywords,
    typeKeywords,
    constrainKeywords,
    operators: [">>", "<<", "--", "~~", ":"],
    symbols: /[=><!~?:&|+\-*\\/\\^%]+/,
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    tokenizer: {
      root: [
        [
          /@?[a-zA-Z0-9][\w$]*/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "typeKeyword",
              "@constrainKeywords": "constrainKeywords",
              "@operators": "operators",
              "@default": "identifier",
            },
          },
        ],
        [/[A-Z][\w\\$]*/, "type.identifier"],
        { include: "@whitespace" },

        [/[{}()\\[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"],
        [/@symbols/, { cases: { "@operators": "operator", "@default": "" } }],
        [
          /@\s*[a-zA-Z_\\$][\w\\$]*/,
          { token: "annotation", log: "annotation token: $0" },
        ],

        [/[;,.]/, "delimiter"],

        [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
        [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],

        [/'[^\\']'/, "string"],
        [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
        [/'/, "string.invalid"],
      ],
      comment: [
        [/[^\\/*]+/, "comment"],
        [/\/\*/, "comment", "@push"], // nested comment
        ["\\*/", "comment", "@pop"],
        [/[\\/*]/, "comment"],
      ],
      string: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
      ],
      whitespace: [
        [/[ \t\r\n]+/, "white"],
        [/\/\*/, "comment", "@comment"],
        [/\/\/.*$/, "comment"],
      ],
    },
  });

  monaco.languages.registerCompletionItemProvider("unknown-language", {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const suggestions = [
        ...keywords.map((key) => {
          return {
            label: key,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: key,
            range,
          };
        }),
        ...typeKeywords.map((key) => {
          return {
            label: key,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: key,
            range,
          };
        }),
      ];
      return { suggestions: suggestions };
    },
  });

  monaco.editor.defineTheme("unknown-language-theme", {
    inherit: true,
    encodedTokensColors: undefined,
    base: "vs",
    rules: [
      { token: "keyword", foreground: "#56B1FF", fontStyle: "bold" },
      { token: "operator", foreground: "#F3A76E" },
      { token: "string", foreground: "#F1A880" },
      { token: "comment", foreground: "#7D7D7D" },
      { token: "bracket", foreground: "#8381F1" },
      { token: "typeKeyword", foreground: "#FBA03F" },
      { token: "constrainKeywords", foreground: "#D350C1" },
      { token: "delimiter", foreground: "#ffffff" },
      { token: "number", foreground: "#FBA03F" },
      { token: "identifier", foreground: "#D6E4F6" },
    ],
    colors: {
      "editor.foreground": "#000000",
      "editor.background": "#1F1F1F",
      "editorCursor.foreground": "#c4c4c4",
      "editor.lineHighlightBackground": "#474746",
      "editorLineNumber.foreground": "#7c7c7c",
      "editor.selectionBackground": "#6E6E6E",
      "editor.inactiveSelectionBackground": "#CDCDCD",
      "editorBracketMatch.background": "#CDCDCD",
      "editorLineNumber.activeForeground": "#c8c8c8",
    },
  });
};

export const lineRegex = /[^a-zA-Z]/g;
export const regex = /(.*)\((.*)\)/i;
export const regexForeign = /[^)]+$/;
