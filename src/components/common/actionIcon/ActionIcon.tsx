import clsx from "clsx";
import { MouseEvent, PropsWithChildren } from "react";
import { ButtonVariant, variants } from "../button";

type ESize = "md" | "lg" | "xl";

const containSize: Record<ESize, string> = {
  md: "text-sm p-1",
  lg: "text-md p-2",
  xl: "text-xl p-4",
};

interface ActionIconProps extends PropsWithChildren {
  size?: ESize;
  variant?: ButtonVariant;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

export const ActionIcon = ({
  children,
  size = "md",
  variant = "primary",
  onClick,
  className,
}: ActionIconProps) => {
  return (
    <div
      onClick={onClick}
      role="button"
      className={clsx(
        "rounded-md w-fit",
        variants[variant],
        containSize[size],
        className
      )}
    >
      {children}
    </div>
  );
};
