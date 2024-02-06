import { TypedLiveblocksProvider } from "config";
import { createContext, useContext } from "react";

interface Context {
  room: string;
  name: string;
  provider?: TypedLiveblocksProvider;
  joinRoom: (room: string) => void;
  setName: (room: string) => void;
  setProvider: (provider: TypedLiveblocksProvider) => void;
}

export const SocketContext = createContext<Context>({
  room: "",
  name: "",
  joinRoom: () => {},
  setName: () => {},
  setProvider: () => {},
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};
