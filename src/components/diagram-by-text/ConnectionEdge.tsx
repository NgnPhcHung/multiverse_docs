import { BaseEdge } from "@src/interfaces";
import { getEdgeParams, NodeExtended } from "@utils/getEdgeParams";
import {
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useInternalNode,
} from "@xyflow/react";
import clsx from "clsx";

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
}: EdgeProps<Edge<BaseEdge>>) {
  const sourceNode = useInternalNode(source) as NodeExtended;
  const targetNode = useInternalNode(target) as NodeExtended;
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
        className={clsx("react-flow__edge-path", data?.classNames?.path)}
        d={edgePath}
        strokeWidth={5}
        markerEnd={markerEnd}
        style={style}
      />
      <EdgeLabelRenderer>
        <EdgeLabel
          transform={`translate(-50%, -50%)  translate(${labelX}px,${labelY}px)`}
          label={String(data?.label)}
        />
      </EdgeLabelRenderer>
    </>
  );
}

export default ConnectionEdge;
