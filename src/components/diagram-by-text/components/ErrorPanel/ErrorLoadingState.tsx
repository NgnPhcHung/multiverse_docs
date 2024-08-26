import { useEditorStore } from "@src/store";
import { Loader } from "lucide-react";
import { ReactNode } from "react";

interface ErrorLoadingStateProps {
  fallback?: ReactNode;
}

export const ErrorLoadingState = ({ fallback }: ErrorLoadingStateProps) => {
  const { isLoading } = useEditorStore((state) => ({
    isLoading: state.isLoading,
  }));
  return isLoading ? (
    <div className="flex items-center space-x-2 ">
      <Loader className="animate-spin size-4" />
      <p>Checking error, please wait</p>
    </div>
  ) : (
    <div className="text-sm">{fallback}</div>
  );
};
