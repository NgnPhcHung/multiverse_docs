import { TableType, useEditorStore } from "store";
import { lineRegex, regexForeign } from "./editorSettings";

export const useEditorFormatter = () => {
  const { updateForeignList, updateTableList } = useEditorStore();

  const formatValue = (value: string) => {
    const userInputValues = lineRegex.exec(value);
    const inputValues = userInputValues?.input
      ? userInputValues.input
      : userInputValues;

    const newValue = inputValues
      ?.toString()
      ?.replace(/(\r\n|\n|\r)/gm, "")
      .replace(/ +(?= )/g, "");

    const splitTable = newValue?.split("Create ");
    const foreignTemp = regexForeign.exec(newValue || "")?.[0].split(",");

    const foreign: string[] = [];
    foreignTemp?.forEach((f) => {
      f = f.replace("Foreign ", "").replace(/[<<>>~-]/g, "-");
      f = f.replace(/\s/g, "");
      foreign.push(f.replace(/[.]/g, " "));
    });

    updateForeignList(foreign);

    return splitTable;
  };

  const onFormat = (value: string) => {
    if (!value) return;

    const temp: TableType[] = [];
    const formattedValue = formatValue(value);
    let tables: TableType[] = [];

    formattedValue?.forEach((v) => {
      let nameFlag = 0;
      let entityFlag = 0;

      const regexValue = v;
      if (regexValue !== null) {
        const tableName = regexValue.substring(0, regexValue.indexOf(" "));
        const result = regexValue
          .substring(regexValue.indexOf(" ") + 1)
          .slice(1, -1);
        const tableEntity = result;

        temp.push({ tableName, tableEntity });
        if (tableName === null && tableEntity === null) return "";

        if (tables.length <= 0) {
          tables.push({ tableName, tableEntity });
        } else {
          tables.forEach((tb) => {
            nameFlag = 0;
            entityFlag = 0;
            tables.forEach((v) => {
              if (v.tableName === tableName) {
                nameFlag++;
                if (v.tableEntity) entityFlag++;
              }
            });
            if (nameFlag === 0) {
              tables.push({ tableName, tableEntity });
            } else if (nameFlag === 1) {
              if (tb.tableEntity || entityFlag === 1) {
                const filteredTable = tables.filter(
                  (item) => item.tableName !== tableName
                );
                tables = filteredTable;
                tables.push({ tableName, tableEntity });
              }
            }
          });
        }
      }
    });
    updateTableList(temp);
  };

  return { onFormat, formatValue };
};
