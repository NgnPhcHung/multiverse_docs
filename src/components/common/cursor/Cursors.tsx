import { THROTTLE } from "consts";
import throttle from "lodash.throttle";
import { PointerEvent, useCallback } from "react";
import { useUsers } from "y-presence";
import { Cursor } from "./Cursor";
import { awareness } from "store";

export const Cursors = () => {
  const users = useUsers(awareness, (state) => state);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePointMove = useCallback(
    throttle((e: PointerEvent) => {
      awareness.setLocalStateField("point", [e.clientX, e.clientY]);
    }, THROTTLE),
    []
  );

  return (
    <div
      onPointerMove={handlePointMove}
      className="absolute top-0 left-0- w-full h-full"
    >
      {Array.from(users.entries()).map(([key, value]) => {
        if (key === awareness.clientID) return null;
        return <Cursor key={key} color={value.color} point={value.point} />;
      })}
    </div>
  );
};
