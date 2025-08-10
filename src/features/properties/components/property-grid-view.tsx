"use client";

import { cn } from "@/lib/utils";
import { PropertyData } from "@/types";
import { Image } from "@imagekit/next";

interface PropertyGridViewProps {
  images: PropertyData["images"];
}

export const PropertyGridView = ({ images }: PropertyGridViewProps) => {
  return (
    <div className="mt-5 grid grid-cols-4 gap-2.5">
      {images.slice(0, 5).map(({ id, url, blurDataUrl }, i) => (
        <Image
          key={id}
          src={url}
          alt={`Property Image ${i + 1}`}
          width={600}
          height={400}
          placeholder="blur"
          transformation={[{ height: 400, width: 600 }]}
          blurDataURL={blurDataUrl}
          className={cn(
            i === 0 && "col-span-2 row-span-2 h-full rounded-l-lg",
            (i === 2 || i === 4) && "rounded-r-lg",
          )}
        />
      ))}
    </div>
  );
};
