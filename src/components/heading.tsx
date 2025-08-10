"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeadingProps {
  elem?: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
}

export const Heading = ({
  elem: Elem = "h1",
  children,
  className,
}: HeadingProps) => {
  return (
    <Elem
      className={cn(
        "font-medium",
        Elem === "h1" && "text-2xl md:text-3xl",
        Elem === "h2" && "text-xl md:text-2xl",
        className,
      )}
    >
      {children}
    </Elem>
  );
};
