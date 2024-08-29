import { HIGHLIGHT_PATH_CLASSNAME } from "@src/components/editor/editorSettings";
import { Edge, OnSelectionChangeParams } from "@xyflow/react";

export function highlightPath({ edges }: { edges: Edge[] }) {
  const getNodesByParent = (selected: OnSelectionChangeParams) => {
    const selectedNode = selected.nodes[0];
    const nodeParentId = selectedNode?.parentId
      ? selectedNode.parentId
      : selectedNode.id;

    const ed = edges.map((edge) => {
      const isHighlight =
        edge.target.split(".")[0] === nodeParentId ||
        edge.source.split(".")[0] === nodeParentId;
      const path = isHighlight ? HIGHLIGHT_PATH_CLASSNAME : undefined;
      return {
        ...edge,
        data: {
          ...edge.data,
          classNames: {
            path,
          },
        },
      };
    });
    return ed;

    // return nodes.map((node) => {
    //   node.data.classNames = node.data.classNames || {};

    //   node.data.classNames.line =
    //     node.parentId === parentId ? HIGHTLIGHT_PATH_CLASSNAME : undefined;
    // });
  };

  return { getNodesByParent };
}

export const getNodesByParent = (
  selected: OnSelectionChangeParams,
  edges: Edge[]
) => {
  const selectedNode = selected.nodes[0];
  const nodeParentId = selectedNode?.parentId
    ? selectedNode.parentId
    : selectedNode.id;

  const ed = edges.map((edge) => {
    const isHighlight =
      edge.target.split(".")[0] === nodeParentId ||
      edge.source.split(".")[0] === nodeParentId;
    const path = isHighlight ? HIGHLIGHT_PATH_CLASSNAME : undefined;
    return {
      ...edge,
      data: {
        ...edge.data,
        classNames: {
          path,
        },
      },
    };
  });
  return ed;

  // return nodes.map((node) => {
  //   node.data.classNames = node.data.classNames || {};

  //   node.data.classNames.line =
  //     node.parentId === parentId ? HIGHTLIGHT_PATH_CLASSNAME : undefined;
  // });
};
