import { ElementRef, MouseEvent, useRef } from "react";
import { ButtonProps, ButtonWrapper } from "./ButtonWrapper";

export const FileButton = ({
  children,
  className,
  onClick,
  rightIcon,
}: ButtonProps) => {
  const fileInputRef = useRef<ElementRef<"input">>(null);

  const handleButtonClick = (event: MouseEvent) => {
    onClick?.(event);
    fileInputRef.current?.click();
  };

  return (
    <ButtonWrapper
      className={className}
      onClick={onClick}
      rightIcon={rightIcon}
    >
      <div className="w-full h-full" onClick={handleButtonClick}>
        {children}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        id="file-button-attachment"
        className="invisible hidden"
      />
    </ButtonWrapper>
  );
};
