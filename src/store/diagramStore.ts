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
  setNode: (node: Node) => Promise<void>;
  initStore: () => Promise<void>;
}

export const useDiagramStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],

  onNodesChange: (changes: NodeChange<Node>[]) => {
    const updatedNodes = applyNodeChanges(changes, get().nodes);
    set({ nodes: updatedNodes });
  },
  onEdgesChange: (changes: EdgeChange<Edge>[]) => {
    const updatedEdges = applyEdgeChanges(changes, get().edges);
    set({ edges: updatedEdges });
  },
  setEdges: async (edges: Edge[]) => {
    try {
      await localForage.setItem("edges", edges);
      set({ edges });
    } catch (error) {
      console.error("Failed to save edges:", error);
    }
  },

  setNode: async (node: Node) => {
    try {
      const nodes = (await localForage.getItem<Node[]>("nodes")) || [];
      const updatedNodes = [...nodes, node];
      await localForage.setItem("nodes", updatedNodes);
      set({ nodes: updatedNodes });
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
