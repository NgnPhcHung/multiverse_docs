import { createContext, useContext } from "react";

interface Context {
  room: string;
  name: string;
  joinRoom: (room: string) => void;
  setName: (room: string) => void;
}

export const SocketContext = createContext<Context>({
  room: "",
  name: "",
  joinRoom: () => {},
  setName: () => {},
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};
