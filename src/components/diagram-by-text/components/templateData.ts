import { DBDiagramTemplate } from "@src/consts";
import { simpleEdges, simpleEditorContent, simpleNodes } from "../data/simple";
import { Edge, Node } from "@xyflow/react";

export const templateData: Record<
  DBDiagramTemplate,
  {
    edges: Edge<any>[];
    nodes: Node<any>[];
    editorContent: string;
  }
> = {
  [DBDiagramTemplate.Blank]: {
    edges: [],
    nodes: [],
    editorContent: "",
  },
  [DBDiagramTemplate.Simple]: {
    edges: simpleEdges,
    nodes: simpleNodes,
    editorContent: simpleEditorContent,
  },
  [DBDiagramTemplate.Stripe]: {
    edges: simpleEdges,
    nodes: simpleNodes,
    editorContent: simpleEditorContent,
  },
};
