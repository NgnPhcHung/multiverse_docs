import { useMyPresence, useOthers } from "config";
import { PointerEvent } from "react";
import { Cursor } from "./Cursor";

export const Cursors = () => {
  const [, updateMyPresence] = useMyPresence();
  const others = useOthers();

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
    updateMyPresence({ cursor });
  }

  function handlePointerLeave() {
    updateMyPresence({ cursor: null });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const handlePointMove = useCallback(
  //   throttle((e: PointerEvent) => {
  //     awareness.setLocalStateField("point", [e.clientX, e.clientY]);
  //   }, THROTTLE),
  //   []
  // );

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="absolute top-0 left-0- w-full h-full"
    >
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(
          ({ connectionId, presence }) =>
            presence.cursor !== null && (
              <Cursor
                key={connectionId}
                x={presence.cursor.x}
                y={presence.cursor.y}
              />
            )
        )}
    </div>
  );
};
