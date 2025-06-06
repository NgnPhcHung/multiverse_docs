import { useScreenSize } from "@hooks/useScreenSize";
import clsx from "clsx";
import { ChevronLeft, MenuIcon } from "lucide-react";
import {
  ElementRef,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ActionIcon } from "../actionIcon";

interface SidebarProps extends PropsWithChildren {
  customMinWidth?: number;
  navItems?: ReactNode;
}

const DEFAULT_MIN_WIDTH = 240;

export const Sidebar = ({
  children,
  navItems,
  customMinWidth = DEFAULT_MIN_WIDTH,
}: SidebarProps) => {
  const { md: isMobile, xl, xxl, lg, xxxl } = useScreenSize();
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const sideWidth = useMemo(() => {
    if (xxxl || xxl) {
      return 960;
    }
    if (lg || xl) {
      return 768;
    }
    return 640;
  }, [lg, xl, xxl, xxxl]);

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < customMinWidth) newWidth = customMinWidth;
    if (newWidth > sideWidth) newWidth = sideWidth;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "480px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100%  - 480px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "480px");
      setTimeout(() => setIsResetting(false), 300);
    }
  }, [isMobile]);

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile, resetWidth]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [isMobile]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={clsx(
          "group/sidebar h-full overflow-y-auto relative flex w-60  flex-col z-sideBar",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <ActionIcon
          variant="secondary"
          onClick={collapse}
          className={clsx(
            "absolute top-5 right-5 opacity-0 group-hover/sidebar:opacity-100 z-[99999]",
            isMobile && "opacity-100"
          )}
        >
          <ChevronLeft className="h-4 w-4 text-gray-200" />
        </ActionIcon>
        <div className="h-full overflow-hidden">{!isCollapsed && children}</div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 right-0 top-0 group-hover/sidebar:bg-blue-500 "
        />
      </aside>
      <nav
        ref={navbarRef}
        className={clsx(
          "absolute top-0 z-sideBar left-60 flex",
          customMinWidth
            ? `w-[calc(100%-${customMinWidth}px)] `
            : `w-[calc(100%-${DEFAULT_MIN_WIDTH}px)]`,
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full",
          isCollapsed && "bg-transparent"
        )}
      >
        {/* {isCollapsed && (
          <nav className="bg-transparent w-fit ml-1 mt-3">
            <ActionIcon variant="secondary" size="md" onClick={resetWidth}>
              <MenuIcon className="w-4 h-4" />
            </ActionIcon>
          </nav>
        )} */}

        <div className="z-50 bg-secondary p-2 w-full flex items-center group/navbar h-12 space-x-2">
          <ActionIcon
            variant="secondary"
            size="md"
            onClick={resetWidth}
            className={clsx({
              hidden: !isCollapsed,
            })}
          >
            <MenuIcon className="w-4 h-4" />
          </ActionIcon>
          {
            navItems && navItems 
          }
        </div>
      </nav>
    </>
  );
};
