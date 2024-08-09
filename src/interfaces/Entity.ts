import { EntityProperty } from "./EntityProperty";

export type Entity = {
  name: string;
  property?: EntityProperty[];
};
