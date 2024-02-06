import { socketClient } from "./../config/liveblocks.config";
import { createClient, EnsureJson } from "@liveblocks/client";
import { liveblocks, type WithLiveblocks } from "@liveblocks/zustand";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "reactflow";
import { create } from "zustand";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNode: (payload: Node[]) => void;
  setEdges: (payload: Edge[]) => void;
}

interface Storage {
  nodes: Node[];
  edges: Edge[];
}

export const useDiagramStore = create<
  WithLiveblocks<FlowState, {}, EnsureJson<any>>
>(
  liveblocks(
    (set, get) => ({
      edges: [
        // { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
        // { id: "e2-3", source: "2", target: "3", label: "with" },
        // { id: "e3-4", source: "3", target: "4", label: "and", animated: true },
      ],
      nodes: [
        // {
        //   id: "1",
        //   type: "input",
        //   data: { label: "Multiplayer" },
        //   position: { x: 250, y: 25 },
        // },
        // {
        //   id: "2",
        //   data: { label: "flowcharts" },
        //   position: { x: 100, y: 125 },
        // },
        // {
        //   id: "3",
        //   data: { label: "React Flow" },
        //   position: { x: 250, y: 225 },
        // },
        // {
        //   id: "4",
        //   type: "output",
        //   data: { label: "Liveblocks" },
        //   position: { x: 100, y: 325 },
        // },
      ],

      // Apply changes to React Flow when the flowchart is interacted with
      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection: Connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
      },
      setNode: (payload: Node[]) => set({ nodes: payload }),
      setEdges: (payload: Edge[]) => set({ edges: payload }),
    }),
    {
      // Add Liveblocks client
      client: socketClient,

      // Define the store properties that should be shared in real-time
      storageMapping: {
        nodes: true,
        edges: true,
      },
    }
  )
);
