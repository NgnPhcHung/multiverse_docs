import { DiagramByEditor } from "components";
import { AppLiveBlocksProvider, SocketContext } from "components/providers";
import { TypedLiveblocksProvider } from "config";
import { useState } from "react";

export default function DiagramByEditorPage() {
  const roomId = "diagram-script";
  const [room, joinRoom] = useState(roomId);
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
