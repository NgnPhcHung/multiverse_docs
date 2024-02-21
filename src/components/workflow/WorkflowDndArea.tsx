import ReactFlow, {
  Background,
  BackgroundVariant,
  ReactFlowProvider,
} from "reactflow";

export const WorkflowDndArea = () => {
  return (
    <>
      <ReactFlowProvider>
        <ReactFlow fitView>
          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </ReactFlowProvider>
    </>
  );
};
