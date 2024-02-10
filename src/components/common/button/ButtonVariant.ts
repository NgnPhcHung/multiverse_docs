export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "subtle"
  | "white";

export const variants: Record<ButtonVariant, string> = {
  ["primary"]: "bg-primary text-secondary hover:bg-primaryHover",
  ["secondary"]:
    "bg-secondary hover:bg-secondaryHover text-primary",
  ["outline"]: "border-1 border-solid border-brand",
  ["subtle"]:
    "bg-secondary/10 hover:bg-secondary/20 text-gray-900 hover:text-gray-950",
  ["white"]: "bg-transparent",
};
