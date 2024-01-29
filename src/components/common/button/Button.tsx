import clsx from "clsx";
import { ButtonVariant, variants } from ".";
import { MouseEventHandler, PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  variant?: ButtonVariant;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Button = ({
  variant = "primary",
  className,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      role="button"
      className={clsx(
        "px-4 py-1 font-semibold text-center rounded-sm flex items-center justify-center",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
};
