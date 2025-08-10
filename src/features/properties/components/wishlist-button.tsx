"use client";

import { Button } from "@/components/ui/button";
import { toggleWishList } from "@/features/wishlist/actions";
import { cn } from "@/lib/utils";
import { PropertyData } from "@/types";
import { useState, useTransition } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "sonner";

interface WishlistButtonProps {
  property: PropertyData;
}

export const WishlistButton = ({ property }: WishlistButtonProps) => {
  const [hasWishlist, setHasWishlist] = useState(!!property.wishlists.length);
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    const next = !hasWishlist;
    setHasWishlist(next);
    toast.success(
      hasWishlist
        ? "Property removed from wishlist"
        : "Property added to wishlist",
    );
    startTransition(async () => {
      const { success, message } = await toggleWishList(property.id);
      if (success) {
        return;
      }
      toast.error(message);
      setHasWishlist(!next);
    });
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className={cn(
        "group absolute bg-transparent hover:bg-rose-500/10 top-3 right-3 cursor-pointer rounded-full",
        isPending && "",
      )}
    >
      <FaRegHeart
        className={cn(
          "relative z-10 size-5.5 text-white/80 hover:scale-105",
          hasWishlist && "text-rose-500",
        )}
      />
      <FaHeart
        className={cn(
          "text-foreground/50 absolute size-5.5 group-hover:text-rose-500/20",
          hasWishlist && "text-rose-500 group-hover:text-rose-500",
        )}
      />
    </Button>
  );
};
