import { TableForeign } from "interfaces";
import { create } from "zustand";

export interface TableType {
  tableName: string;
  tableEntity: string;
}

type State = {
  tableList?: TableType[];
  foreignList?: TableForeign[];
  editorFileContent?: TableType[];
};
type Action = {
  updateTableList: (tableList: State["tableList"]) => void;
  updateForeignList: (foreignList: State["foreignList"]) => void;
  setEditorContent: (editorFileContent: State["editorFileContent"]) => void;
};

export const useEditorStore = create<State & Action>((set) => ({
  tableList: undefined,
  foreignList: undefined,
  editorFileContent: undefined,
  updateTableList: (tableList) => set(() => ({ tableList })),
  updateForeignList: (foreignList) => set(() => ({ foreignList })),
  setEditorContent: (editorFileContent) => set(() => ({ editorFileContent })),
}));
