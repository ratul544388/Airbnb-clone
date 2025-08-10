"use client";

import { Heading } from "@/components/heading";
import { AMENITIES_MAP } from "@/constants";
import { Property } from "@prisma/client";

interface AmenitiesProps {
  amenities: Property["amenities"];
}

export const Amenities = ({ amenities }: AmenitiesProps) => {
  return (
    <section>
      <Heading className="text-2xl font-semibold">What this place offers</Heading>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {amenities.map((item) => {
          const Icon = AMENITIES_MAP[item as keyof typeof AMENITIES_MAP];
          return (
            <li
              key={item}
              className="text-foreground/70 flex items-center gap-3 text-lg font-medium"
            >
              <Icon className="size-6" />
              {item}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
