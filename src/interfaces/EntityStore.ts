import { Entity } from "./Entity";

export interface EntityStore extends Omit<Entity, "renderType"> {}
