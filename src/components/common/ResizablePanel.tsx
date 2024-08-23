import { ElementRef, PropsWithChildren, useRef, useState } from "react";

interface ResizablePanelProps extends PropsWithChildren {}

export const ResizablePanel = ({ children }: ResizablePanelProps) => {
  const isResizingRef = useRef(false);
  const panelRef = useRef<ElementRef<"div">>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    const newHeight = event.clientY;

    if (panelRef.current) {
      const currentHeight = Number(
        panelRef.current.style.height.replace("px", "")
      );

      panelRef.current.style.height = `${currentHeight + newHeight}px`;
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const collapse = () => {
    setIsCollapsed(true);
  };

  return (
    <div
      ref={panelRef}
      className="origin-top absolute h-56 bottom-0 w-full bg-red-400 group/resizable"
    >
      <div
        onMouseDown={handleMouseDown}
        className="opacity-0 group-hover/resizable:opacity-100 transition cursor-ns-resize absolute h-1 w-full  group-hover/resizable:bg-blue-500 "
      />
      {children}
    </div>
  );
};
