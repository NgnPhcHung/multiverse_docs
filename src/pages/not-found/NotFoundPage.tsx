import React, { ElementRef, useEffect, useRef } from "react";
import { TextShadow } from "./TextShadow";
import { Button } from "@components";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const textRef = useRef<ElementRef<"div">>(null);
  const trailRef = useRef<ElementRef<"div">>(null);
  const navigation = useNavigate();

  const shift = (
    element: HTMLElement,
    index: number,
    rangeX: number,
    rangeY: number
  ) => {
    const translationIntensity = 14;
    const maxTranslation = translationIntensity * (index + 1);
    const currentTranslationX = `${(maxTranslation * rangeX).toFixed(2)}%`;
    const currentTranslationY = `${(maxTranslation * rangeY).toFixed(2)}%`;

    element.style.transition = "transform 0.1s";
    element.style.transform = `translate(${currentTranslationX}, ${currentTranslationY})`;
  };

  const shiftLogo = (e: React.MouseEvent) => {
    if (!textRef.current) return;
    const subText = textRef.current.querySelectorAll<HTMLElement>("p");
    const radius = 1000;

    subText.forEach((element, index) => {
      const rect = element.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rangeX = (e.clientX - centerX) / radius;
      const rangeY = (e.clientY - centerY) / radius;

      shift(element, index, rangeX, rangeY);
    });
  };

  useEffect(() => {
    const animateTrailer = (e: MouseEvent) => {
      if (!trailRef.current) return;
      const trailer = trailRef.current;
      const x = e.clientX - trailer.offsetWidth / 2,
        y = e.clientY - trailer.offsetHeight / 2;

      const keyframes = {
        transform: `translate(${x}px, ${y}px) scale(${1})`,
      };

      trailer.animate(keyframes, {
        duration: 800,
        fill: "forwards",
      });
    };
    window.addEventListener("mousemove", animateTrailer);
  }, []);

  return (
    <div
      className="bg-gray-300 lg:bg-gray-950 h-full w-full grid place-items-center origin-center select-none relative group overflow-hidden"
      ref={textRef}
      onMouseMove={shiftLogo}
    >
      <div
        ref={trailRef}
        className="w-[30rem] h-[30rem] bg-white pointer-events-none rounded-full fixed top-0 left-0 z-modalOverlay opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 ease-in-out"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 200%)",
          filter: "blur(100px)",
        }}
      ></div>

      <div className="w-2/5 h-3/5 grid place-items-center group/404">
        <TextShadow content="404" />
      </div>
      <div className="text-secondary lg:text-primary text-lg md:text-2xl font-semibold p-6 text-center text-wrap w-3/5 flex flex-wrap justify-center items-center  space-y-1 space-x-2 z-modal">
        <span>
          Maybe this page moved? Got deleted? Is hiding out in quarantine?
          Finding nemo? Let's
        </span>
        <Button
          variant="secondary"
          className={{
            button: "w-fit !p-2 !text-xl",
          }}
          onClick={() => navigation("/")}
        >
          Go home
        </Button>
        <span>and try from there.</span>
      </div>
    </div>
  );
}
