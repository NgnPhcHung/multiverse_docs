import { EntityStore } from "@src/interfaces";
import localForage from "localforage";
import { create } from "zustand";

type State = {
  entities?: EntityStore[];
  editorFileContent?: string;
  initStore: () => Promise<void>;
};

type Action = {
  setEntities: (entities: State["entities"]) => void;
  setEditorContent: (editorFileContent: State["editorFileContent"]) => void;
};

export const useEditorStore = create<State & Action>((set) => ({
  entities: undefined,
  editorFileContent: undefined,
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
