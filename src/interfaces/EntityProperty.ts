import { BaseNode } from "./BaseNode";

export type EntityProperty = BaseNode & {
  dataType: string;
  constrains: string;
  comment?: string;
};
