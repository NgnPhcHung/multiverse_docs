import { WebsocketProvider } from "y-websocket";
import { Doc } from "yjs";

export const doc = new Doc();

export const provider = new WebsocketProvider(
  "wss://demos.yjs.dev/ws",
  "sequenceQueryDnD",
  doc,
  { connect: false }
);
provider.on("status", (status: string) => console.log(status));
provider.on("connection-error", () => {
  provider.shouldConnect = false;
});

export const awareness = provider.awareness;
