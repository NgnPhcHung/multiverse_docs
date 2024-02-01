import { Loading } from "components";
import { useEffect } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from "reactflow";
import { useDiagramStore } from "store";
import { useOverrideRoomId } from "utils";
import "reactflow/dist/style.css";

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
  return (
    <div className="w-[950px] h-[950px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className="w-[950px] h-[950px]"
      >
        <MiniMap position="bottom-right" />
        <Controls
          position="bottom-center"
          className="flex p-2 bg-white rounded-md text-teal-500"
        />
      </ReactFlow>
      <Background className="bg-brand" variant={BackgroundVariant.Dots} />
    </div>
  );
};
