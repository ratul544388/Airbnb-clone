"use client";
import { buttonVariants } from "@/components/ui/button";
import { sidebarItems } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="h-main min-w-[260px] py-5 sticky top-header hidden md:block">
      <nav className="h-full bg-background p-4 border w-full rounded-xl">
        <ul>
          {sidebarItems.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                className={buttonVariants({
                  variant: "ghost",
                  className: cn(
                    "h-11 w-full justify-start rounded-lg",
                    pathname === href && "bg-accent",
                  ),
                })}
              >
                <Icon className="size-5" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
