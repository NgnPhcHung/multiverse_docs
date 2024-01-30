import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

export const ydoc = new Y.Doc();

export const provider = new WebsocketProvider(
  `wss://diagram.sequence`,
  "sequenceQueryDnD",
  ydoc,
  { connect: false }
);

export const awareness = provider.awareness;
