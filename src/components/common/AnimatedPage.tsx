import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";

export const AnimatedPage = ({ children }: PropsWithChildren) => {
  const doorVariants = {
    initial: { width: "50vw" },
    enter: { width: "0vw" },
    exit: { width: ["30vw", "45vw", "50vw"] },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="w-full h-full relative"
        exit={{
          scale: 0.7,
          opacity: 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        <motion.div
          className="absolute h-full w-1/2 bg-secondary border-0 border-r-2 border-solid border-primary top-0 left-0 z-[9999]"
          variants={doorVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{
            delay: 0.3,
            ease: [0.6, -0.05, 0.01, 0.99],
            duration: 1.75,
          }}
        />
        <motion.div
          className="absolute h-full w-1/2 bg-secondary border-0 border-l-2 border-solid border-primary top-0 right-0 z-[9999]"
          variants={doorVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{
            delay: 0.3,
            ease: [0.6, -0.05, 0.01, 0.99],
            duration: 1.75,
          }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
