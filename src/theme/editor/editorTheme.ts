import { colorDark, rulesDark } from "./dark";
import { colorLight, rulesLight } from "./light";

export enum EditorTheme {
  Dark = "dark",
  Light = "light",
}

export const editorRule = {
  [EditorTheme.Light]: rulesLight,
  [EditorTheme.Dark]: rulesDark,
};

export const editorColor = {
  [EditorTheme.Light]: colorLight,
  [EditorTheme.Dark]: colorDark,
};
