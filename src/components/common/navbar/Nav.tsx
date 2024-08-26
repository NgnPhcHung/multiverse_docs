import { PropsWithChildren } from "react";

export const Nav = ({ children }: PropsWithChildren) => {
  return (
    <>
      <nav className="z-50 bg-secondary p-2 w-full flex items-center space-x-4 group/navbar h-[var(--navHeight)]">
        {children}
      </nav>
    </>
  );
};
