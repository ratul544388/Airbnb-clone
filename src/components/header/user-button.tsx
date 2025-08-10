"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { placeholderAvatar } from "@/constants";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { User } from "better-auth";
import { Heart, LayoutDashboard, LogOut, User2, UserPlus2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const UserButton = ({ user }: { user: User | null }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const dropdownItems = [
    ...(user
      ? [
          {
            label: "Dashboard",
            icon: LayoutDashboard,
            onClick: () => router.push("/dashboard"),
          },
          {
            label: "Wishlist",
            icon: Heart,
            onClick: () => router.push("/dashboard/wishlist"),
          },
          {
            label: "Profile",
            icon: User2,
            onClick: () => router.push("/profile"),
          },
          {
            label: "Logout",
            icon: LogOut,
            onClick: async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.refresh()
                    toast.success("Logged out");
                  },
                },
              });
            },
          },
        ]
      : [
          {
            label: "Login",
            icon: User2,
            onClick: () => router.push("/login"),
          },
          {
            label: "Register",
            icon: UserPlus2,
            onClick: () => router.push("/register"),
          },
        ]),
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "group",
          buttonVariants({
            variant: "ghost",
            size: "icon",
            className: "ml-auto size-10 !rounded-full",
          }),
        )}
      >
        <span className="relative size-8 overflow-hidden rounded-full">
          <Image
            src={user?.image || placeholderAvatar}
            alt="Avatar"
            fill
            className="bg-accent size-full rounded-full object-cover"
          />
          <span className="absolute top-0 -left-2 block h-full w-1 -rotate-[25deg] bg-white blur-[1.7px] transition-all duration-300 group-hover:left-[105%]" />
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-fit px-0 pb-3" align="end">
        {user && (
          <div className="flex items-center gap-3 px-3 pb-3">
            <div className="relative size-14">
              <Image
                fill
                src={user?.image || placeholderAvatar}
                alt="Avatar"
                className="bg-accent size-full rounded-full object-cover"
              />
            </div>
            <div className="text-sm">
              <p className="font-medium">{user?.name || "Annonymous"}</p>
              <p className="text-muted-foreground font-medium">
                {user?.email || "Annonymous"}
              </p>
            </div>
          </div>
        )}
        <ul className="flex flex-col">
          {dropdownItems.map(({ label, icon, onClick }) => {
            const Icon = icon;
            return (
              <li
                onClick={() => {
                  onClick();
                  setOpen(false);
                }}
                key={label}
                role="button"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-foreground/70 hover:text-foreground/70 hover:bg-accent/50 justify-start rounded-none pr-8!",
                )}
              >
                <Icon className="text-muted-foreground size-4" />
                {label}
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
