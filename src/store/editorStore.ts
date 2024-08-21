import { EntityStore, TableReference } from "@src/interfaces";
import localForage from "localforage";
import { create } from "zustand";

type State = {
  references?: TableReference[];
  entities?: EntityStore[];
  editorFileContent?: string;
  initStore: () => Promise<void>;
};

type Action = {
  setReferences: (references: State["references"]) => void;
  setEntities: (entities: State["entities"]) => void;
  setEditorContent: (editorFileContent: State["editorFileContent"]) => void;
};
localForage.config({
  name: "multi_docDB",
  storeName: "defaultDatabase",
});
export const useEditorStore = create<State & Action>((set) => ({
  references: undefined,
  entities: undefined,
  editorFileContent: undefined,
  setReferences: (references) => set(() => ({ references })),
  setEntities: (entities) => set(() => ({ entities })),
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
      set({ editorFileContent: editContent || "" });
    } catch (error) {
      console.error("Failed to initialize store:", error);
    }
  },
}));
