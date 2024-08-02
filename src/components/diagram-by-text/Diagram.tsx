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
import { useMemo } from "react";
import ConnectionEdge from "./ConnectionEdge";
import { Tables } from "./Tables";

export const Diagram = () => {
  const { edges, nodes, onEdgesChange, onNodesChange } = useDiagramStore();
  const nodeTypes = useMemo(() => ({ tables: Tables }), []);
  const { isDarkMode } = useAppStore();

  const edgeTypes = useMemo(
    () => ({
      floating: ConnectionEdge,
    }),
    []
  );

  return (
    <div className="w-full h-full bg-primary">
      <ReactFlow
        fitView
        snapToGrid
        snapGrid={[20, 20]}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesConnectable={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
      >
        <MiniMap position="bottom-right" />

        <Background
          className="!bg-diagram"
          variant={BackgroundVariant.Dots}
          color={isDarkMode ? "#fafafc" : "#202020"}
        />
      </ReactFlow>
    </div>
  );
};
