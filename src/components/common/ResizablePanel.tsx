import clsx from "clsx";
import { ElementRef, PropsWithChildren, useEffect, useRef } from "react";

interface ResizablePanelProps extends PropsWithChildren {
  isPanelOpened?: boolean;
}

export const ResizablePanel = ({
  children,
  isPanelOpened,
}: ResizablePanelProps) => {
  const isResizingRef = useRef(false);
  const panelRef = useRef<ElementRef<"div">>(null);

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
    if (!isResizingRef.current || !panelRef.current || !isPanelOpened) return;

    const navHeight = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--navHeight");
    const minHeight = 40;
    const maxHeight = window.innerHeight - parseInt(navHeight);
    const newHeight = event.clientY - 50;
    const clampedHeight = Math.min(Math.max(newHeight, minHeight), maxHeight);

    const heightToRender =
      maxHeight - clampedHeight <= minHeight
        ? "80px"
        : `calc(100vh - ${clampedHeight}px)`;

    panelRef.current.style.height = heightToRender;
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (!panelRef.current) return;

    panelRef.current.style.height = isPanelOpened ? "240px" : "80px";
  }, [isPanelOpened]);

  return (
    <div
      ref={panelRef}
      className={clsx(
        "origin-top absolute h-56 bottom-0 w-full bg-red-400 group/resizable",
        "transition-all ease-out"
      )}
    >
      <div
        onMouseDown={handleMouseDown}
        className={clsx(
          "transition cursor-ns-resize absolute h-[1px] w-full bg-primaryHover",
          isPanelOpened && "hover:h-1"
        )}
      />
      {children}
    </div>
  );
};
