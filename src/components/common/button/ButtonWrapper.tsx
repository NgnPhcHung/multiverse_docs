import clsx from "clsx";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { ChangeEventHandler, MouseEventHandler, PropsWithChildren } from "react";
import { ButtonVariant, variants } from ".";
import { DynamicIcon } from "..";

export interface ButtonProps extends PropsWithChildren {
  variant?: ButtonVariant;
  className?: {
    button?: string;
    rightIcon?: string;
  };
  rightIcon?: keyof typeof dynamicIconImports;
  onClick?: MouseEventHandler<Element>;
  onChange?: ChangeEventHandler<Element>;
}

export const ButtonWrapper = ({
  variant = "primary",
  className,
  children,
  rightIcon,
}: ButtonProps) => {
  return (
    <div
      role="button"
      className={clsx(
        "px-2 py-1 font-semibold text-center rounded-sm flex items-center justify-center text-sm text-nowrap",
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
