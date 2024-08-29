import { BaseEdge, BaseNode, Entity } from "@src/interfaces";
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
  nodes: Node<BaseNode>[];
  edges: Edge<BaseEdge>[];
  hydrated: boolean;
  onNodesChange: (changes: NodeChange<Node<BaseNode>>[]) => void;
  onEdgesChange: (changes: EdgeChange<Edge<BaseEdge>>[]) => void;
  setEdges: (edges: Edge<BaseEdge>[]) => Promise<void>;
  setNode: (node: Node<BaseNode>[]) => Promise<void>;
  initStore: () => Promise<void>;
  hydrateStore: () => Promise<void>;
}
localForage.config({
  name: "multi_docDB",
  storeName: "defaultDatabase",
});
export const useDiagramStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  hydrated: false,
  hydrateStore: async () => {
    if (!get().hydrated) {
      await get().initStore();
      set({ hydrated: true });
    }
  },

  onNodesChange: async (changes: NodeChange<Node<BaseNode>>[]) => {
    const updatedNodes = applyNodeChanges(changes, get().nodes);
    try {
      await localForage.setItem("nodes", updatedNodes);
      set({ nodes: updatedNodes });
    } catch (error) {
      console.error("Failed to save node:", error);
    }
  },
  onEdgesChange: async (changes: EdgeChange<Edge<BaseEdge>>[]) => {
    const updatedEdges = applyEdgeChanges(changes, get().edges);
    try {
      await localForage.setItem("edges", updatedEdges);
      set({ edges: updatedEdges });
    } catch (error) {
      console.error("Failed to save edges:", error);
    }
  },
  setEdges: async (edges: Edge<BaseEdge>[]) => {
    try {
      await localForage.setItem("edges", edges);
      set({ edges });
    } catch (error) {
      console.error("Failed to save edges:", error);
    }
  },

  setNode: async (nodes: Node<BaseNode>[]) => {
    try {
      await localForage.setItem("nodes", nodes);
      set({ nodes });
    } catch (error) {
      console.error("Failed to save node:", error);
    }
  },

  initStore: async () => {
    try {
      const nodes = (await localForage.getItem<Node<Entity>[]>("nodes")) || [];
      const edges =
        (await localForage.getItem<Edge<BaseEdge>[]>("edges")) || [];
      set({ edges, nodes });
    } catch (error) {
      console.error("Failed to initialize store:", error);
    }
  },
}));
