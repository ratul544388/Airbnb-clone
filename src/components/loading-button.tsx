"use client";

import { VariantProps } from "class-variance-authority";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type LoadingButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    isLoading: boolean;
    loadingLabel?: string;
  };

export const LoadingButton = ({
  isLoading,
  variant,
  size,
  className,
  children,
  loadingLabel,
}: LoadingButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(isLoading && "pointer-events-none opacity-60", className)}
    >
      {isLoading && <Loader2 className="size-4 animate-spin" />}
      {isLoading ? `${loadingLabel}...` : children}
    </Button>
  );
};
