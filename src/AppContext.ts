import { createContext, useContext } from "react";

interface AppContext {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

export const AppContext = createContext<AppContext>({
  isDarkMode: false,
  setIsDarkMode: () => {},
});
export const useAppContext = () => useContext(AppContext);
