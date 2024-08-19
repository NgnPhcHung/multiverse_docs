import { SQLVariableType } from "@interfaces/SQLVariableType";
import * as monacoType from "monaco-editor";
import { EditorTheme, editorRule, editorColor } from "src/theme";

export const defaultEditorValue = `Create owner ( 
  ownerId: Number  PrimaryKey,
  firstName: Varchar unique NN,
  lastName: Varchar,
  phonenumber: Varchar NN,
)

Create animal ( 
  animalId: Number PrimaryKey,
  ownerId: Number NN,
  name: Char NN,
  species: Char NN,
  notes: Varchar,
)

Create case ( 
  id: Number PrimaryKey,
  animalId: Number NN,
  statusId: Number NN,
  addressId: Varchar
)

Create status ( 
  statusId: Number PrimaryKey,
  type: Varchar NN,
)


Create vaccine ( 
  vaccineId: Number PrimaryKey,
  type: Varchar NN,
  description: Varchar,
)


Create animal_vaccine ( 
  vaccineId: Number PrimaryKey,
  animalId: Number PrimaryKey,
)

Create address (
  addressId: Number PrimaryKey,
  country: Char NN,
  city: Char NN,
  ward: Char,
  describe: Varchar
)

Foreign owner.ownerId >> animal.ownerId,
Foreign case.animalId >> animal.animalId,
Foreign case.statusId -- status.statusId,
Foreign case.addressId << address.addressId,
Foreign animal_vaccine.vaccineId << vaccine.vaccineId,
Foreign animal_vaccine.animalId << animal.animalId,
`;

export const settingMonacoEditor = (
  monaco: typeof monacoType,
  isDarkMode?: boolean
) => {
  const theme = isDarkMode ? EditorTheme.Dark : EditorTheme.Light;
  const keywords = ["Create", "PrimaryKey", "Foreign"];
  const typeKeywords = Object.keys(SQLVariableType);
  const constrainKeywords = ["NOT NULL", "not null", "UNIQUE", "unique"];
  monaco.languages.register({ id: "unknown-language" });
  monaco.languages.setMonarchTokensProvider("unknown-language", {
    keywords,
    typeKeywords,
    constrainKeywords,
    operators: [">>", "<<", "--", "~~", ":", "<>"],
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
      return { suggestions };
    },
  });

  monaco.editor.defineTheme("unknown-language-theme", {
    inherit: true,
    encodedTokensColors: undefined,
    base: isDarkMode ? "vs" : "vs-dark",

    rules: editorRule[theme],
    colors: editorColor[theme],
  });
};
export const setEditorTheme = (
  monaco: typeof monacoType,
  isDarkMode: boolean
) => {
  const theme = isDarkMode ? EditorTheme.Dark : EditorTheme.Light;

  monaco.editor.defineTheme("unknown-language-theme", {
    inherit: true,
    encodedTokensColors: undefined,
    base: isDarkMode ? "vs" : "vs-dark",

    rules: editorRule[theme],
    colors: editorColor[theme],
  });
};

export const regex = /(.*)\((.*)\)/i;
export const regexForeign = /[^)]+$/;
export const chenRelationRegex = /[<<>>~-]/g;
export const lineRegex = /\bCreate\s+\w+\s*\((?:[^()]|\([^)]*\))+\)/gi;
export const regexType = /(\w+)\s*\(([^)]+)\)/;
