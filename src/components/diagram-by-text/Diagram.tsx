import { Loading } from "components";
import { useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import { useDiagramStore } from "store";
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

  if (isStorageLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <MiniMap position="bottom-right" />
        <Controls
          position="bottom-center"
          className="flex p-2 bg-white rounded-md shadow-none"
        />
        <Background className="bg-brand" variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
};
