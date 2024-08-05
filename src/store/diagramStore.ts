import {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from "@xyflow/react";
import localForage from "localforage";
import { create } from "zustand";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange<Node>[]) => void;
  onEdgesChange: (changes: EdgeChange<Edge>[]) => void;
  setEdges: (edges: Edge[]) => Promise<void>;
  setNode: (node: Node[]) => Promise<void>;
  initStore: () => Promise<void>;
}

export const useDiagramStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],

  onNodesChange: async (changes: NodeChange<Node>[]) => {
    const updatedNodes = applyNodeChanges(changes, get().nodes);
    try {
      await localForage.setItem("nodes", updatedNodes);
      set({ nodes: updatedNodes });
    } catch (error) {
      console.error("Failed to save node:", error);
    }
  },
  onEdgesChange: async (changes: EdgeChange<Edge>[]) => {
    const updatedEdges = applyEdgeChanges(changes, get().edges);
    try {
      await localForage.setItem("edges", updatedEdges);
      set({ edges: updatedEdges });
    } catch (error) {
      console.error("Failed to save edges:", error);
    }
  },
  setEdges: async (edges: Edge[]) => {
    try {
      await localForage.setItem("edges", edges);
      set({ edges });
    } catch (error) {
      console.error("Failed to save edges:", error);
    }
  },

  setNode: async (nodes: Node[]) => {
    try {
      await localForage.setItem("nodes", nodes);
      set({ nodes});
    } catch (error) {
      console.error("Failed to save node:", error);
    }
  },

  initStore: async () => {
    try {
      const nodes = (await localForage.getItem<Node[]>("nodes")) || [];
      const edges = (await localForage.getItem<Edge[]>("edges")) || [];
      set({ nodes, edges });
    } catch (error) {
      console.error("Failed to initialize store:", error);
    }
  },
}));
