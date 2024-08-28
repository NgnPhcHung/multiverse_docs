import { DiagramDataType } from "./DiagramDataType";

export type EntityProperty = {
  name: string;
  dataType: string;
  constrains: string;
  className?: string;
  renderType: DiagramDataType;
  comment?: string;
};
