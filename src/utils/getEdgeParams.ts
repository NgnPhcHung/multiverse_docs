import { Position } from "@xyflow/react";

interface Node {
  internals: {
    positionAbsolute: {
      x: number;
      y: number;
    };
    handleBounds: {
      source: Array<Handle>;
    };
  };
  measured: {
    width: number;
    height: number;
  };
}

interface Handle {
  position: Position;
  x: number;
  y: number;
  width: number;
  height: number;
}

// Function to get the center coordinates of a node
function getNodeCenter(node: Node): { x: number, y: number } {
  return {
    x: node.internals.positionAbsolute.x + node.measured.width / 2,
    y: node.internals.positionAbsolute.y + node.measured.height / 2,
  };
}

// Function to get the parameters for node connection handles based on their position
function getParams(nodeA: Node, nodeB: Node): [number, number, Position] {
  const centerA = getNodeCenter(nodeA);
  const centerB = getNodeCenter(nodeB);

  const horizontalDiff = Math.abs(centerA.x - centerB.x);
  const verticalDiff = Math.abs(centerA.y - centerB.y);

  let position: Position;

  if (horizontalDiff > verticalDiff) {
    position = centerA.x > centerB.x ? Position.Left : Position.Right;
  } else {
    position = centerA.y > centerB.y ? Position.Top : Position.Bottom;
  }

  const [x, y] = getHandleCoordsByPosition(nodeA, position);
  return [x, y, position];
}

// Function to get handle coordinates by position
function getHandleCoordsByPosition(node: Node, handlePosition: Position): [number, number] {
  const handle = node.internals.handleBounds.source.find(
    h => h.position === handlePosition
  );

  if (!handle) {
    throw new Error("Handle not found");
  }

  let offsetX = handle.width / 2;
  let offsetY = handle.height / 2;

  switch (handlePosition) {
    case Position.Left:
      offsetX = 0;
      break;
    case Position.Right:
      offsetX = handle.width;
      break;
    case Position.Top:
      offsetY = 0;
      break;
    case Position.Bottom:
      offsetY = handle.height;
      break;
  }

  const x = node.internals.positionAbsolute.x + handle.x + offsetX;
  const y = node.internals.positionAbsolute.y + handle.y + offsetY;

  return [x, y];
}

// Function to get the parameters needed to create an edge
export function getEdgeParams(source: Node, target: Node) {
  const [sx, sy, sourcePos] = getParams(source, target);
  const [tx, ty, targetPos] = getParams(target, source);

  return {
    sx,
    sy,
    tx,
    ty,
    sourcePos,
    targetPos,
  };
}
