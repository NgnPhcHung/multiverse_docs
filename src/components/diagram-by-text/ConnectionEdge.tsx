import { getEdgeParams } from "@utils/getEdgeParams";
import {
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useInternalNode
} from "@xyflow/react";

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
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
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
          label={data?.label}
        />
      </EdgeLabelRenderer>
    </>
  );
}

export default ConnectionEdge;
