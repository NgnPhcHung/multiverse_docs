import { Handle, HandleProps, useHandleConnections } from "@xyflow/react";

interface Props extends HandleProps {
  connectionCount: number;
}

const CustomConnectionHandler = ({ connectionCount, ...props }: Props) => {
  const connections = useHandleConnections({
    type: props.type,
  });

  return (
    <Handle {...props} isConnectable={connections.length < connectionCount} />
  );
};

export default CustomConnectionHandler;
