import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ActionIcon } from "../actionIcon";
import { X } from "lucide-react";
import { PropsWithChildren, memo } from "react";

type ESize = "md" | "lg" | "xl";

const containSize: Record<ESize, string> = {
  md: "xl:w-4/5 min-w-[calc(100vw - 40rem)] h-fit",
  lg: "w-1/3 h-1/3",
  xl: "w-4/5 h-4/5",
};

interface DialogProps extends PropsWithChildren {
  opened: boolean;
  onClose: () => void;
  size?: ESize;
  title?: string;
  classNames?: {
    container?: string;
    title?: string;
    description?: string;
  };
}

export const Dialog = ({
  title,
  opened,
  onClose,
  size = "md",
  children,
  classNames,
}: DialogProps) => {
  return (
    <AnimatePresence>
      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="bg-primary/30 backdrop-blur fixed inset-0 z-50 grid place-items-center cursor-pointer overflow-hidden w-screen h-screen"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              "bg-secondary text-primary p-4 rounded-lg shadow-xl cursor-default relative overflow-hidden ",
              containSize[size],
              classNames?.container
            )}
          >
            <h3
              className={clsx(
                classNames?.title,
                "font-semibold text-lg text-start"
              )}
            >
              {title}
            </h3>
            <ActionIcon
              variant="subtle"
              className="absolute right-2 top-2"
              onClick={onClose}
            >
              <X size={16} />
            </ActionIcon>
            <div
              className={clsx(
                classNames?.description,
                "overflow-hidden flex-wrap flex flex-col items-center justify-center w-full h-full"
              )}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface DescriptionProps extends PropsWithChildren {}

const Description = ({ children }: DescriptionProps) => {
  return <div className="mt-6  w-full h-full">{children}</div>;
};

Dialog.Description = Description;
export const MemoizedDialog = memo(Dialog);
