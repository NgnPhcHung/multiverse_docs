export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "subtle"
  | "white";

export const variants: Record<ButtonVariant, string> = {
  ["primary"]: "bg-brand text-gray-100 hover:bg-brand/70 hover:text-gray-300",
  ["secondary"]:
    "bg-secondary hover:bg-secondary/50 text-gray-100 hover:text-gray-300",
  ["outline"]: "border-1 border-solid border-brand",
  ["subtle"]:
    "bg-secondary/10 hover:bg-secondary/20 text-gray-900 hover:text-gray-950",
  ["white"]: "bg-transparent",
};
