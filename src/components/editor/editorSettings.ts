import { DataTypes, DBConstrains, EditorKeywords } from "@src/consts";
import { DiagramDataType, EntityProperty } from "@src/interfaces";
import { CoordinateExtent } from "@xyflow/react";
import * as monacoType from "monaco-editor";
import { EditorTheme, editorColor, editorRule } from "src/theme";

export const defaultEditorValue = `Create owner ( 
  ownerId: Int  Primary AutoIncrement,
  firstName: Varchar Unique NotNull,
  lastName: Varchar,
  phonenumber: Varchar NotNull,
)

Create animal ( 
  animalId: Int Primary AutoIncrement,
  ownerId: Int NotNull,
  name: Char NotNull,
  species: Char NotNull,
  notes: Varchar,
)

Create case ( 
  id: Int Primary AutoIncrement,
  animalId: Int NotNull,
  statusId: Int NotNull,
  addressId: Varchar
)

Create status ( 
  statusId: Int Primary AutoIncrement,
  type: Varchar NotNull,
)


Create vaccine ( 
  vaccineId: Int Primary AutoIncrement,
  type: Varchar NotNull,
  description: Varchar,
)


Create animal_vaccine ( 
  vaccineId: Int Primary AutoIncrement,
  animalId: Int Primary,
)

Create address (
  addressId: Int Primary AutoIncrement,
  country: Char NotNull,
  city: Char NotNull,
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
  const keywords = Object.keys(EditorKeywords);
  const typeKeywords = Object.keys(DataTypes);
  const constrainKeywords = Object.keys(DBConstrains);
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

export const defaultTable = (tableName: string) => {
  return {
    id: tableName,
    type: "tables",
    data: {
      name: tableName,
      renderType: DiagramDataType.Table,
      className: TABLE_TITLE_CLASSNAME,
    },
    position: { x: 136, y: 32 },
  };
};

export const defaultSettings = (
  tableName: string,
  property: EntityProperty,
  index: number
) => {
  return {
    id: `${tableName}.${property.name}`,
    type: "tables",
    position: { x: 136, y: 32 * (index + 1) },
  };
};

export const defaultProperty = (
  tableName: string,
  property: EntityProperty,
  index: number
) => {
  return {
    ...defaultSettings(tableName, property, index),
    extent: "parent" as "parent" | CoordinateExtent,
    parentId: tableName,
    data: {
      ...property,
      type: DiagramDataType.Property,
    },
  };
};
const TABLE_TITLE_CLASSNAME =
  "!bg-brandHover p-1 px-2 relative flex justify-between items-center h-10 text-white font-semibold ml-[136px]";
export const regexComment = /\[(.*?)\]/;
export const regex = /(.*)\((.*)\)/i;
export const regexForeign = /[^)]+$/;
export const chenRelationRegex = /[<<>>~-]/g;
export const lineRegex = /\bCreate\s+\w+\s*\((?:[^()]|\([^)]*\))+\)/gi;
export const regexType = /(\w+)\s*\(([^)]+)\)/;
