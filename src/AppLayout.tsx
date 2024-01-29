import { PropsWithChildren } from "react";

export default function AppLayout ({children}:PropsWithChildren) {
  return <div className="w-screen h-screen" >
    {children}
  </div>
}