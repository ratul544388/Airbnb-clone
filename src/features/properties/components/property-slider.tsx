"use client";

import { PropertyData } from "@/types";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import slugify from "slugify";
import { PropertyCard } from "./property-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface PropertySliderProps {
  properties: PropertyData[];
  title: string;
}

export const PropertySlider = ({ properties, title }: PropertySliderProps) => {
  const ariaLabledBy = slugify(title, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  });

  return (
    <section aria-labelledby={ariaLabledBy} className="">
      <h2
        id={ariaLabledBy}
        className="flex items-center gap-2 text-2xl font-semibold"
      >
        <Link href="/" className="flex items-center gap-2">
          <span>{title}</span>
          <FaChevronRight className="size-4" aria-hidden="true" />
        </Link>
      </h2>
      <Carousel
        opts={{ align: "start", dragFree: true }}
        className="scrollbar-none flex snap-x overflow-x-auto py-3"
      >
        <CarouselContent className="-ml-3">
          {properties.map((property) => (
            <CarouselItem
              key={property.id}
              className="basis-1/2 pl-3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <PropertyCard key={property.id} property={property} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
