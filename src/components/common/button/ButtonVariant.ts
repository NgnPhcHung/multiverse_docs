export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "subtle"
  | "white"
  | "brand";

export const variants: Record<ButtonVariant, string> = {
  ["primary"]: "bg-primary text-secondary hover:bg-primaryHover",
  ["brand"]: "bg-brand text-secondary hover:bg-brandHover",
  ["secondary"]: "bg-secondaryHover hover:bg-secondary text-primary",
  ["outline"]: "border-1 border-solid border-brand",
  ["subtle"]:
    "bg-secondary/10 hover:bg-secondary/20 text-gray-900 hover:text-gray-950",
  ["white"]: "bg-transparent",
};
