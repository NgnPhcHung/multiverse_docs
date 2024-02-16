import { useCallback } from "react";
import { EdgeProps, Position, getSmoothStepPath, useStore } from "reactflow";
import { getEdgeParams } from "utils/getEdgeParams";

function ConnectionEdge({ id, source, target, markerEnd, style }: EdgeProps) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  if (!sourceNode || !targetNode) {
    return null;
  }


  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath] = getSmoothStepPath({
    sourceX: sx as number,
    sourceY: sy as number,
    sourcePosition: sourcePos as Position,
    targetPosition: targetPos as Position,
    targetX: tx as number,
    targetY: ty as number,
  });

  return (
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      strokeWidth={5}
      markerEnd={markerEnd}
      style={style}
    />
  );
}

export default ConnectionEdge;
