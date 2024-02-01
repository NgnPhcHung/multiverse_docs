import { Loading } from "components";
import { useEffect } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import { useDiagramStore } from "store";
import { useOverrideRoomId } from "utils";

export const Diagram = () => {
  const {
    liveblocks: { enterRoom, leaveRoom, isStorageLoading },
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useDiagramStore();

  const roomId = useOverrideRoomId("zustand-flowchart");

  useEffect(() => {
    enterRoom(roomId);
    return () => leaveRoom();
  }, [enterRoom, leaveRoom, roomId]);

  if (isStorageLoading) {
    return <Loading />;
  }

  console.log(nodes);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap position="bottom-right" />
        <Controls
          position="bottom-center"
          className="flex p-2 bg-white rounded-md text-teal-500"
        />
        <Background className="bg-brand" variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
};
