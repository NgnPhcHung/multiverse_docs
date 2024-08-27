import { DiagramDataType } from "./DiagramDataType";
import { EntityProperty } from "./EntityProperty";

export type Entity = {
  name: string;
  className?: string;
  properties?: EntityProperty[];
  renderType: DiagramDataType;
};
