import clsx from "clsx";
import { ButtonVariant, variants } from ".";
import { MouseEventHandler, PropsWithChildren } from "react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { DynamicIcon } from "..";

interface ButtonProps extends PropsWithChildren {
  variant?: ButtonVariant;
  className?: {
    button?: string;
    rightIcon?: string;
  };
  onClick?: MouseEventHandler<HTMLDivElement>;
  rightIcon?: keyof typeof dynamicIconImports;
}

export const Button = ({
  variant = "primary",
  className,
  children,
  onClick,
  rightIcon,
}: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      role="button"
      className={clsx(
        "px-4 py-1 font-semibold text-center rounded-sm flex items-center justify-center",
        variants[variant],
        className?.button
      )}
    >
      {rightIcon && (
        <DynamicIcon
          name={rightIcon}
          size={16}
          className={clsx("text-gray-500 mr-2", className?.rightIcon)}
        />
      )}
      {children}
    </div>
  );
};
