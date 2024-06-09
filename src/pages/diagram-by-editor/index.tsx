import { AppLiveBlocksProvider, SocketContext } from "@components";
import { TypedLiveblocksProvider } from "config";
import { useState } from "react";
import { DiagramByEditor } from "./diagram-by-text";
import { useUser } from "@hooks";

export default function DiagramByEditorPage() {
  const { userSettings } = useUser();
  const [room, joinRoom] = useState(userSettings.diagramRoom);
  const [name, setName] = useState("");
  const [provider, setProvider] = useState<TypedLiveblocksProvider>();
  return (
    <SocketContext.Provider
      value={{
        name,
        room,
        provider,
        setProvider,
        setName,
        joinRoom,
      }}
    >
      <AppLiveBlocksProvider>
        <DiagramByEditor />
      </AppLiveBlocksProvider>
    </SocketContext.Provider>
  );
}
