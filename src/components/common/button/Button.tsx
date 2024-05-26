import { ButtonProps, ButtonWrapper } from "./ButtonWrapper";

export const Button = ({
  variant = "primary",
  className,
  children,
  onClick,
  rightIcon,
}: ButtonProps) => {
  return (
    <ButtonWrapper
      className={className}
      rightIcon={rightIcon}
      variant={variant}
    >
      <div onClick={onClick} role="button" className="w-full h-full">
        {children}
      </div>
    </ButtonWrapper>
  );
};
