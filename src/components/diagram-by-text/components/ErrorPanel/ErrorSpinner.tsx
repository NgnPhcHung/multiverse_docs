import { useEditorStore } from "@src/store";
import { AlertTriangle, Loader } from "lucide-react";

interface ErrorSpinnerProps {
  errorCount: number;
}

export const ErrorSpinner = ({ errorCount }: ErrorSpinnerProps) => {
  const { isLoading } = useEditorStore((state) => ({
    isLoading: state.isLoading,
  }));

  if (isLoading) {
    return <Loader className="animate-spin size-4" />;
  }

  return (
    errorCount > 0 && (
      <div className="flex items-center space-x-1 text-red-500">
        <AlertTriangle size={16} />
        <div className="text-sm">{errorCount}</div>
      </div>
    )
  );
};
