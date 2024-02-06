import { PropsWithChildren } from "react";

interface TooltipProps extends PropsWithChildren {
  content?: string;
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  return (
    <div className="relative group/tooltip-hover">
      <div data-tooltip-target="tooltip-default" className="">
        {children}
      </div>
      <div
        role="tooltip"
        className="opacity-0 group-hover/tooltip-hover:opacity-100 break-keep bg-primary absolute w-max -bottom-[3.1rem] right-0 rounded-md p-1 font-semibold"
      >
        {content}
        <div
          className="after:absolute after:contents-[''] after:w-0 after:h-0 after:right-2 after:-top-2 after:border-l-[5px] after:border-l-transparent
  after:border-b-[10px] after:border-b-primary
  after:border-r-[5px] after:border-r-transparent"
          data-popper-arrow
        ></div>
      </div>
    </div>
  );
};
