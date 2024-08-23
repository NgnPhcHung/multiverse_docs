import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { FoldVertical, UnfoldVertical } from "lucide-react";
import { PropsWithChildren, useState } from "react";

interface CollapsiblePanelProps extends PropsWithChildren {
  title: string;
  className?: {
    root?: string;
  };
}

export const CollapsiblePanel = ({
  title,
  children,
  className,
}: CollapsiblePanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={clsx("bg-secondary text-default", className?.root)}>
      <div
        className="flex items-center p-1 cursor-pointer hover:bg-gray-700"
        onClick={toggle}
      >
        {isOpen ? (
          <FoldVertical size={16} className="text-primary mr-2" />
        ) : (
          <UnfoldVertical size={16} className="text-primary mr-2" />
        )}
        <span className="ml-2 text-sm font-semibold">{title}</span>
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
