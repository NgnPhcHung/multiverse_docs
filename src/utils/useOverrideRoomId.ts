import { useMemo } from "react";
import { useParams } from "react-router-dom";

export function useOverrideRoomId(roomId: string) {
  const query = useParams();
  const overrideRoomId = useMemo(() => {
    return query?.roomId ? `${roomId}-${query.roomId}` : roomId;
  }, [query, roomId]);

  return overrideRoomId;
}

export function overrideRoom(roomId: string, queryRoomId?: string) {
  return queryRoomId ? `${roomId}-${queryRoomId}` : roomId;
}
