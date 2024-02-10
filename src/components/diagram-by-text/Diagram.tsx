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
import { useAppContext } from "AppContext";

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
  const { isDarkMode } = useAppContext();

  if (isStorageLoading) {
    return <Loading />;
  }


  return (
    <div className="w-full h-full ">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        snapGrid={[20,20]}
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
