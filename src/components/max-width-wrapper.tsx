import type { HTMLAttributes } from "react";
// @libs
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;  
}

export function MaxWidthWrapper({children, className, ...props}: Readonly<Props>) {
  return (
    <div className={cn("w-full max-w-screen-xl h-full mx-auto px-2.5 md:px-20", className)} {...props}>
      {children}
    </div>
  );
}
