import { EntityProperty } from "./EntityProperty";
import { BaseNode } from "./BaseNode";

export type Entity = BaseNode & {
  properties?: EntityProperty[];
};
