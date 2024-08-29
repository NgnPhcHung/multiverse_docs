import { DiagramDataType } from "./DiagramDataType";

export type BaseNode = {
  name: string;
  renderType: DiagramDataType;
  classNames?: ClassNames;
};

interface ClassNames {
  title?: string;
  property?: string;
}
