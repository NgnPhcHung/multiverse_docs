import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export const AnimatedPage = ({ children }: PropsWithChildren) => {
  const doorVariants = {
    initial: {
      width: "50vw",
      opacity: 1,
    },
    enter: {
      width: "0vw",
      delay: 0.2,
    },
    exit: {
      width: "50vw",
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: "easeInOut",
        delay: 0.2,
      },
    },
  };

  return (
    <div className="w-full h-full relative">
      <motion.div
        className="absolute h-full w-1/2 bg-secondary  top-0 left-0 z-[9999]"
        variants={doorVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{
          ease: [0.6, -0.05, 0.01, 0.99],
          duration: 1.75,
        }}
      />
      <motion.div
        className="absolute h-full w-1/2 bg-secondary  top-0 right-0 z-[9999]"
        variants={doorVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{
          ease: [0.6, -0.05, 0.01, 0.99],
          duration: 1.75,
        }}
      />
      {children}
    </div>
  );
};
