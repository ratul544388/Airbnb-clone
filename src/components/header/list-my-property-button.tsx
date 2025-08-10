"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const ListMyPropertyButton = () => {
  const pathname = usePathname();
  const href = "/dashboard/my-properties/new";
  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: "ghost",
        className: cn(pathname === href && "hidden!", "hidden! sm:block!"),
      })}
    >
      List Your Property
    </Link>
  );
};
