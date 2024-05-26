export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "subtle"
  | "white";

export const variants: Record<ButtonVariant, string> = {
  ["primary"]: "bg-primary text-secondary hover:bg-primaryHover",
  ["secondary"]: "bg-secondaryHover hover:bg-secondary text-primary",
  ["outline"]: "border-1 border-solid border-brand",
  ["subtle"]:
    "bg-secondary/10 hover:bg-secondary/20 text-primary hover:text-primaryHover ",
  ["white"]: "bg-transparent",
};
