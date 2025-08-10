import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn("relative aspect-[256/80] w-30", className)}>
      <Image fill src="/logo.png" alt="Logo" />
    </Link>
  );
};
