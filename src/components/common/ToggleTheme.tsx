import { useAppStore } from "@src/store";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { ElementRef, useEffect, useRef } from "react";
import { flushSync } from "react-dom";

export const ToggleTheme = () => {
  const { isDarkMode, setIsDarkMode } = useAppStore();
  const ref = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDarkMode, setIsDarkMode]);

  const toggleDarkMode = async () => {
    if (
      !ref.current ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsDarkMode(isDarkMode);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setIsDarkMode(!isDarkMode);
      });
    }).ready;

    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  return (
    <motion.div
      layout
      className="border-primary hover:border-primary-hover w-8 h-8 overflow-hidden rounded-md border-1 border-solid p-1 relative z-modal hover-text-gray-200"
      onClick={toggleDarkMode}
      role="button"
      ref={ref}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDarkMode ? (
          <motion.span
            className="absolute "
            key={"moon"}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="text-amber-300 w-5 h-5" />
          </motion.span>
        ) : (
          <motion.span
            className="absolute"
            key={"sun"}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="text-gray-800 w-5 h-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
