import { useAppStore } from "@src/store";
import { motion } from "framer-motion";
import { MouseEvent } from "react";

const TiltCard = () => {
  const { isDarkMode } = useAppStore();

  const handleHover = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * 30; // 30 degrees tilt intensity
    const rotateY = (x - 0.5) * -30;

    return { rotateX, rotateY };
  };

  return (
    <motion.div
      className="w-11/12 lg:w-full bg-blue-500 shadow-lg cursor-pointer transition-transform duration-300 ease-out"
      style={{
        perspective: 1000,
      }}
      onMouseMove={(e) => {
        const { rotateX, rotateY } = handleHover(e);
        e.currentTarget.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg)";
      }}
    >
      {isDarkMode ? (
        <img
          src="src/assets/intro_light_mode.png"
          alt="intro_light_mode"
          className="object-contain w-full h-full"
        />
      ) : (
        <img
          src="src/assets/intro_dark_mode.png"
          alt="intro_dark_mode"
          className="object-contain w-full h-full"
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
