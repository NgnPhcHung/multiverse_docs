import { useScreenSize } from "@src/hooks";
import { BaseEdge, BaseNode } from "@src/interfaces";
import { useAppStore } from "@src/store";
import { useDiagramStore } from "@store/diagramStore";
import {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Edge,
  EdgeTypes,
  MiniMap,
  Node,
  NodeTypes,
  OnSelectionChangeParams,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import clsx from "clsx";
import { useCallback } from "react";
import { HIGHLIGHT_PATH_CLASSNAME } from "../editor/editorSettings";
import ConnectionEdge from "./ConnectionEdge";
import { TableRow } from "./components";

export const Diagram = () => {
  const { edges, nodes, onEdgesChange, onNodesChange, setEdges } =
    useDiagramStore();
  const { isDarkMode } = useAppStore();
  const { md: isMobile } = useScreenSize();

  const nodeTypes: NodeTypes = { tables: TableRow };
  const edgeTypes: EdgeTypes = {
    floating: ConnectionEdge,
  };

  const onSelectionChange = useCallback(
    (selection: OnSelectionChangeParams) => {
      const ed: Edge<BaseEdge>[] = edges.map((edge) => {
        const selectedNode = selection.nodes[0];
        const nodeParentId = selectedNode?.parentId
          ? selectedNode.parentId
          : selectedNode?.id;
        const isHighlight =
          edge.target.split(".")[0] === nodeParentId ||
          edge.source.split(".")[0] === nodeParentId;
        const path = isHighlight ? HIGHLIGHT_PATH_CLASSNAME : undefined;

        return {
          ...edge,
          data: { ...edge.data, classNames: { path } },
        };
      });

      if (JSON.stringify(edges) !== JSON.stringify(ed)) {
        setEdges(ed);
      }
    },
    [edges, setEdges]
  );

  console.log("first");
  return (
    <div className="w-full h-full bg-primary">
      <ReactFlow<Node<BaseNode>, Edge<BaseEdge>>
        snapToGrid
        snapGrid={[32, 32]}
        edges={edges}
        nodes={nodes}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesConnectable={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
        onSelectionChange={onSelectionChange}
      >
        <MiniMap
          position="bottom-right"
          className={clsx({
            hidden: isMobile,
          })}
        />

        <Background
          className="!bg-diagram"
          variant={BackgroundVariant.Dots}
          color={isDarkMode ? "#fafafc" : "#202020"}
        />
      </ReactFlow>
    </div>
  );
};
