import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PropsWithChildren, ReactNode } from "react";

interface CollapsiblePanelProps extends PropsWithChildren {
  title: ReactNode;
  className?: {
    root?: string;
  };
  handleTitleClicked?: () => void;
  isOpen: boolean;
}

export const CollapsiblePanel = ({
  title,
  children,
  className,
  handleTitleClicked,
  isOpen,
}: CollapsiblePanelProps) => {

  const toggle = () => {
    handleTitleClicked?.();
  };

  return (
    <div className={clsx("bg-secondary text-default", className?.root)}>
      <div
        className="flex items-center p-1 cursor-pointer hover:bg-gray-700 w-full !select-none"
        onClick={toggle}
      >
        <ChevronDown
          size={16}
          className={clsx(
            " text-primary mr-2 transition-all duration-500 ease-in-out",
            isOpen ? "rotate-0" : "-rotate-90"
          )}
        />
        <div className="mx-2 text-sm font-semibold w-full">{title}</div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
