import { useScreenSize } from "@src/hooks";
import { useAppStore } from "@src/store";
import { useDiagramStore } from "@store/diagramStore";
import {
  Background,
  BackgroundVariant,
  ConnectionMode,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import clsx from "clsx";
import ConnectionEdge from "./ConnectionEdge";
import { Tables } from "./Tables";

export const Diagram = () => {
  const { edges, nodes, onEdgesChange, onNodesChange } = useDiagramStore();
  const { isDarkMode } = useAppStore();
  const { md: isMobile } = useScreenSize();

  const nodeTypes = { tables: Tables };
  const edgeTypes = {
    floating: ConnectionEdge,
  };

  return (
    <div className="w-full h-full bg-primary">
      <ReactFlow
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
