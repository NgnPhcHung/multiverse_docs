import { Loading } from "@components";
import { useDarkMode } from "@hooks";
import { useDiagramStore } from "@store";
import { useStatus } from "config";
import { useEffect, useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import ConnectionEdge from "./ConnectionEdge";
import { Tables } from "./Tables";

export const Diagram = () => {
  const {
    liveblocks: { isStorageLoading },
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useDiagramStore();
  const nodeTypes = useMemo(() => ({ tables: Tables }), []);

  const edgeTypes = useMemo(
    () => ({
      floating: ConnectionEdge,
    }),
    []
  );
  const { isDarkMode } = useDarkMode();
  const status = useStatus();
  useEffect(() => {
    edges.map((edge) => {
      onConnect({
        source: edge.source,
        sourceHandle: edge.sourceHandle || null,
        target: edge.target,
        targetHandle: edge.targetHandle || null,
      });
    });
  }, [edges, onConnect, status]);

  if (isStorageLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full ">
      <ReactFlow
        fitView
        snapToGrid
        nodes={nodes}
        edges={edges}
        snapGrid={[20, 20]}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesConnectable={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
      >
        <MiniMap position="bottom-right" />
        <Controls
          position="bottom-center"
          className="p-2 flex space-x-2 bg-secondary [&>*]:border-b-0 text-md [&>*]:fill-primary rounded-md [&>*]:rounded-md"
        />
        <Background
          className="bg-diagram"
          variant={BackgroundVariant.Dots}
          color={isDarkMode ? "#C0C0C0" : "#202020"}
        />
      </ReactFlow>
    </div>
  );
};
