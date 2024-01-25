import { THROTTLE } from "consts";
import throttle from "lodash.throttle";
import { awareness } from "providers";
import { PointerEvent, useCallback } from "react";
import { useUsers } from "y-presence";
import { Cursor } from "./Cursor";

export const Cursors = () => {
  const users = useUsers(awareness, (state) => state);

  const handlePointMove = useCallback(
    throttle((e: PointerEvent) => {
      awareness.setLocalStateField("point", [e.clientX, e.clientY]);
    }, THROTTLE),
    []
  );

  return (
    <div
      onPointerMove={handlePointMove}
      className="absolute top-0 left-0- w-full h-full bg-red-400"
    >
      {Array.from(users.entries()).map(([key, value]) => {
        if (key === awareness.clientID) return null;
        // return <Cursor key={key} color={value.color} point={value.point} />;

        return (
          (value.point?.length) && (
            <div
              className="w-12 h-12 bg-teal-400 absolute "
              style={{
                transform: `translate(${value.point[0]}px,${value.point[1]}px)`,
              }}
            ></div>
          )
        );
      })}
    </div>
  );
};
