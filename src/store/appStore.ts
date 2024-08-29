import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppStoreState {
  isDarkMode: boolean;
}

interface AppStoreActions {
  setIsDarkMode: (isDarkMode: boolean) => void;
}

type AppStore = AppStoreState & AppStoreActions;

export const useAppStore = create(
  persist<AppStore>(
    (set) => ({
      isDarkMode: false,
      setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
    }),
    {
      name: "app-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
