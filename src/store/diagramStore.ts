import { Entity, EntityProperty } from "@src/interfaces";
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
  nodes: Node<Entity | EntityProperty>[];
  edges: Edge[];
  hydrated: boolean;
  onNodesChange: (changes: NodeChange<Node<Entity>>[]) => void;
  onEdgesChange: (changes: EdgeChange<Edge>[]) => void;
  setEdges: (edges: Edge[]) => Promise<void>;
  setNode: (node: Node<Entity>[]) => Promise<void>;
  initStore: () => Promise<void>;
  hydrateStore: () => Promise<void>;
}

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

  onNodesChange: async (changes: NodeChange<Node<Entity>>[]) => {
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

  setNode: async (nodes: Node<Entity>[]) => {
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
        (await localForage.getItem<Edge<EntityProperty>[]>("edges")) || [];
      set({ edges, nodes });
    } catch (error) {
      console.error("Failed to initialize store:", error);
    }
  },
}));
