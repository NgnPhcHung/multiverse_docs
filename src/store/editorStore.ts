import { TableForeign } from "@interfaces/TableForeign";
import { Node } from "@xyflow/react";
import { create } from "zustand";
import localForage from "localforage";
import { defaultEditorValue } from "@src/components/editor/editorSettings";

export interface TableType extends Node {
  tableName: string;
  tableEntity: string;
}

type State = {
  tableList?: TableType[];
  foreignList?: TableForeign[];
  editorFileContent?: string;
  initStore: () => Promise<void>;
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
  setEditorContent: async (editorFileContent) => {
    try {
      await localForage.setItem("editorContent", editorFileContent);
      set({ editorFileContent });
    } catch (error) {
      console.error("Failed to save content of file:", error);
    }
  },
  initStore: async () => {
    try {
      const editContent = await localForage.getItem<string>("editorContent");
      set({ editorFileContent: editContent || defaultEditorValue });
    } catch (error) {
      console.error("Failed to initialize store:", error);
    }
  },
}));
