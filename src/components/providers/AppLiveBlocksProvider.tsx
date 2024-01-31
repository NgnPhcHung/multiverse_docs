import { RoomProvider } from "config";
import { PropsWithChildren } from "react";
import { useSocketContext } from "./SocketContext";

export const AppLiveBlocksProvider = ({ children }: PropsWithChildren) => {
  const { room } = useSocketContext();
  return (
    <RoomProvider id={room} initialPresence={{ cursor: null }}>
      {children}
    </RoomProvider>
  );
};
