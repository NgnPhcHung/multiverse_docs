import { createContext, useContext } from "react";
import { WebsocketProvider } from "y-websocket";
import { Doc } from "yjs";
// import { WebrtcProvider } from 'y-webrtc'

export const SocketProvider = createContext({});

export const useSocketProvider = () => {
  return useContext(SocketProvider);
};

export const useSocketConnection = ({ roomName }: { roomName: string }) => {
  const doc = new Doc();
  const provider = new WebsocketProvider(
    "wss://demos.yjs.dev/ws",
    roomName,
    doc,
    { connect: false }
  );
  provider.on("status", (status: string) => console.log(status));
  provider.on("connection-error", () => {
    provider.shouldConnect = false;
  });
  const awareness = provider.awareness;

  return {
    awareness,
  };
};
