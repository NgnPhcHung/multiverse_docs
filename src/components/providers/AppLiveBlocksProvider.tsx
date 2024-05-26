import { ClientSideSuspense } from "@liveblocks/react";
import { Loading } from "@components";
import { RoomProvider } from "config";
import { PropsWithChildren, useEffect } from "react";
import { useDiagramStore } from "@store";
import { overrideRoom } from "@utils";
import { useSocketContext } from "./SocketContext";

export const AppLiveBlocksProvider = ({ children }: PropsWithChildren) => {
  const { room } = useSocketContext();

  const {
    liveblocks: { enterRoom, leaveRoom },
  } = useDiagramStore();

  // Enter the Liveblocks room on load
  useEffect(() => {
    const roomId = overrideRoom(room);
    enterRoom(roomId);
    return () => leaveRoom();
  }, [enterRoom, leaveRoom, room]);

  return (
    <RoomProvider id={room} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
