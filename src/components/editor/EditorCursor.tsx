import { TypedLiveblocksProvider } from "config";
import { AwarenessList } from "interfaces";
import { useEffect, useMemo, useState } from "react";

type Props = {
  yProvider: TypedLiveblocksProvider;
};

export function EditorCursor({ yProvider }: Props) {
  // Get user info from Liveblocks authentication endpoint
  const [awarenessUsers, setAwarenessUsers] = useState<AwarenessList>([]);

  useEffect(() => {
    // On changes, update `awarenessUsers`
    function setUsers() {
      setAwarenessUsers([...yProvider.awareness.getStates()] as AwarenessList);
    }

    yProvider.awareness.on("change", setUsers);
    setUsers();

    return () => {
      yProvider.awareness.off("change", setUsers);
    };
  }, [yProvider]);

  // Insert awareness info into cursors with styles
  const styleSheet = useMemo(() => {
    let cursorStyles = "";

    for (const [clientId, client] of awarenessUsers) {
      if (client?.user) {
        cursorStyles += `
          .yRemoteSelection-${clientId}, 
          .yRemoteSelectionHead-${clientId}  {
            --user-color: ${client.user.color};
            color:${client.user.color};
          }

          .yRemoteSelectionHead-${clientId}{
            position: relative;
            height: 100%;
            width: 2rem;
          }
          
          .yRemoteSelectionHead-${clientId}::before{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            height: 19px;
            width: 1px;
            border-left: 2px solid ${client.user.color}
          }

          .yRemoteSelectionHead-${clientId}::after {
            content: "${client.user.name}";
            position: absolute;
            top: -10px;
            left: 5px;
            font-size:10px;
          }
        `;
      }
    }

    return { __html: cursorStyles };
  }, [awarenessUsers]);

  return <style dangerouslySetInnerHTML={styleSheet} />;
}
