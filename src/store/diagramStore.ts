import { EnsureJson } from "@liveblocks/client";
import { liveblocks, type WithLiveblocks } from "@liveblocks/zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import { create } from "zustand";
import { socketClient } from "./../config/liveblocks.config";

type FlowState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;

  setNode: (payload: Node[]) => void;
  setEdges: (payload: Edge[]) => void;
};

type Storage = {
  nodes: FlowState["nodes"];
  edges: FlowState["edges"];
};

export const useDiagramStore = create<
  WithLiveblocks<FlowState, Record<string, never>, EnsureJson<Storage>>
>()(
  liveblocks(
    (set, get) => ({
      edges: [],
      nodes: [],

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
          edges: addEdge(
            {
              ...connection,
              type: "smoothstep",
            },
            get().edges
          ),
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
