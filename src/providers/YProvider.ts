import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export const ydoc = new Y.Doc();

export const provider = new WebsocketProvider(
  "wss://demos.yjs.dev",
  "y-presence + perfect-cursors",
  ydoc
);

export const awareness = provider.awareness;
