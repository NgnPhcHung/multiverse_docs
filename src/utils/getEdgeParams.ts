import { Position, Node } from "@xyflow/react";

interface Center {
  x: number;
  y: number;
}

interface Handle {
  x: number;
  y: number;
  width: number;
  height: number;
  position: Position;
}

interface NodeHandleBounds {
  source?: Handle[];
}

interface NodeInternals {
  handleBounds: NodeHandleBounds;
  positionAbsolute: {
    x: number;
    y: number;
  };
}

interface NodeExtended extends Node {
  internals: NodeInternals;
  measured: {
    width: number;
    height: number;
  };
}

function getNodeCenter(node: NodeExtended): Center {
  return {
    x: node.internals.positionAbsolute.x + node.measured.width / 2,
    y: node.internals.positionAbsolute.y + node.measured.height / 2,
  };
}

function getHandleCoordsByPosition(
  node: NodeExtended,
  handlePosition: Position
): [number, number] {
  const sourceHandles = node.internals.handleBounds.source;

  const handle = sourceHandles?.find((h) => h.position === handlePosition);

  let offsetX = handle?.width || 0 / 2;
  const offsetY = handle?.height || 0 / 2;

  switch (handlePosition) {
    case Position.Left:
      offsetX = 0;
      break;
    case Position.Right:
      offsetX = handle?.width || 0;
      break;
  }

  const x = node.internals.positionAbsolute.x + handle?.x || 0 + offsetX;
  const y = node.internals.positionAbsolute.y + handle?.y || 0 + offsetY;

  return [x, y];
}
function getParams(
  nodeA: NodeExtended,
  nodeB: NodeExtended
): [number, number, Position] {
  const centerA = getNodeCenter(nodeA);
  const centerB = getNodeCenter(nodeB);

  const position = centerA.x > centerB.x ? Position.Left : Position.Right;

  const [x, y] = getHandleCoordsByPosition(nodeA, position);
  return [x, y, position];
}

export function getEdgeParams(
  source: NodeExtended,
  target: NodeExtended
): {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  sourcePos: Position;
  targetPos: Position;
} {
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
