import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey:
    "pk_dev_Pp9vrAbSBHciHzT4oVbPdxzVwYmX32QvcKkyNjz979A95UldHgugh8vmPYpywAZf",
  throttle: 16,
});

type Presence = { cursor: { x: number; y: number } | null };
type Storage = {};
type UserMeta = {};
type RoomEvent = {};

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);
