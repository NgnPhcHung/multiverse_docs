import { ClientSideSuspense } from "@liveblocks/react";
import { Loading } from "components";
import { RoomProvider } from "config";
import { PropsWithChildren } from "react";
import { useSocketContext } from "./SocketContext";

export const AppLiveBlocksProvider = ({ children }: PropsWithChildren) => {
  const { room } = useSocketContext();
  return (
    <RoomProvider id={room} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
