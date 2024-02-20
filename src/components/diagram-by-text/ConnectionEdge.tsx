import { useCallback } from "react";
import {
  EdgeLabelRenderer,
  EdgeProps,
  Position,
  getSmoothStepPath,
  useStore,
} from "reactflow";
import { getEdgeParams } from "utils/getEdgeParams";

// this is a little helper component to render the actual edge label
function EdgeLabel({ transform, label }: { transform: string; label: string }) {
  return (
    <div
      style={{
        transform,
      }}
      className="nodrag nopan absolute font-semibold text-secondary px-2 py-1 bg-primary rounded-sm left-0 top-0"
    >
      {label}
    </div>
  );
}

function ConnectionEdge({
  id,
  source,
  target,
  markerEnd,
  style,
  data,
}: EdgeProps) {
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

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX: sx as number,
    sourceY: sy as number,
    sourcePosition: sourcePos as Position,
    targetPosition: targetPos as Position,
    targetX: tx as number,
    targetY: ty as number,
  });

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        strokeWidth={5}
        markerEnd={markerEnd}
        style={style}
      />
      <EdgeLabelRenderer>
        <EdgeLabel
          transform={`translate(-50%, -50%)  translate(${labelX}px,${labelY}px)`}
          label={data.label}
        />
      </EdgeLabelRenderer>
    </>
  );
}

export default ConnectionEdge;
