"use client";

import { cn } from "@/lib/utils";
import { PropertyData } from "@/types";
import { Image } from "@imagekit/next";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { WishlistButton } from "./wishlist-button";

interface PropertyCardProps {
  property: PropertyData;
  className?: string;
}

export const PropertyCard = ({ property, className }: PropertyCardProps) => {
  const { title, id, images, slug, pricePerNight } = property;
  const { url: imageUrl, blurDataUrl } = images[0];
  return (
    <div className={cn("relative shrink-0", className)}>
      <Link href={`/properties/${id}-${slug}`}>
        <article aria-label={`Property: ${title}`} className="rounded-xl">
          <Image
            src={imageUrl}
            alt={`${title} Image`}
            width={400}
            height={400}
            transformation={[{ width: 400, height: 400 }]}
            placeholder="blur"
            blurDataURL={blurDataUrl}
            className="rounded-xl"
          />
          <h3 className="mt-1 line-clamp-1 text-base font-medium">
            {title}
          </h3>
          <p className="text-muted-foreground flex items-center gap-1 text-sm">
            <span>${pricePerNight} per night</span>
            <span aria-hidden="true" className="select-none">
              ·
            </span>
            <span>4.5</span>
            <span aria-hidden="true" className="select-none">
              ·
            </span>
            <FaStar className="size-3" aria-label="Rating star" />
          </p>
        </article>
      </Link>
      <WishlistButton property={property} />
    </div>
  );
};
