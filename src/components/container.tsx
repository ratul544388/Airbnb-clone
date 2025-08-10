import { cn } from "@/lib/utils";
import { Element } from "@/types";
import { ReactNode } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
  elem?: Element
}

export const Container = ({
    children,
    className,
    elem: Elem = "div",
} : ContainerProps) => {
  return (
     <Elem className={cn('max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8', className)}>
        {children}
     </Elem>
    );
}
