import { ElementRef, useRef } from "react";
import { ButtonProps, ButtonWrapper } from "./ButtonWrapper";

export const FileButton = ({
  children,
  className,
  onChange,
  rightIcon,
}: ButtonProps) => {
  const fileInputRef = useRef<ElementRef<"input">>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <ButtonWrapper
      className={className}
      // onClick={onClick}
      rightIcon={rightIcon}
    >
      <div className="w-full h-full" onClick={handleButtonClick}>
        {children}
      </div>
      <input
        onChange={onChange}
        ref={fileInputRef}
        type="file"
        id="file-button-attachment"
        className="invisible hidden"
      />
    </ButtonWrapper>
  );
};
