import { EditorTextRelation, RelationType } from "interfaces";
import { lineRegex, regexForeign } from "./editorSettings";

export const useEditorFormatter = () => {
  const formatValue = (value: string) => {
    if (!value) return [];
    if (!value.includes("Create")) return [];

    const userInputValues = lineRegex.exec(value);
    const inputValues = userInputValues?.input ?? userInputValues;
    const newValue = inputValues
      ?.toString()
      ?.replace(/(\r\n|\n|\r)/gm, "")
      .replace(/ +(?= )/g, "");
    const splitTable = newValue?.split("Create ") ?? [];
    const foreignTemp = regexForeign.exec(newValue || "")?.[0].split(",") ?? [];
    const foreign: string[] = [];

    foreignTemp.forEach((f) => {
      f = f.replace("Foreign ", "");
      Object.values(EditorTextRelation).forEach((re) =>
        f.replace(re, RelationType[re])
      );
      foreign.push(f.replace(/\s/g, "").replace(/[.]/g, " "));
    });

    return splitTable;
  };

  return { formatValue };
};
