"use client";

import * as React from "react";
import { formatPrice } from "@/lib/utils";
import { Property } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

interface StickyReservationCardProps {
  property: Property;
}

export const StickyReservationCard = ({
  property,
}: StickyReservationCardProps) => {
  const [selectedRange, setSelectedRange] = React.useState<
    DateRange | undefined
  >(undefined);

  const isValidRange =
    selectedRange?.from &&
    selectedRange?.to &&
    (selectedRange.to.getTime() - selectedRange.from.getTime()) /
      (1000 * 60 * 60 * 24) >=
      1;

  const formattedFrom = selectedRange?.from
    ? selectedRange.from.toLocaleDateString()
    : "Check-in";

  const formattedTo = selectedRange?.to
    ? selectedRange.to.toLocaleDateString()
    : "Check-out";

  return (
    <div className="top-header sticky h-fit py-10 md:block hidden">
      <div className="min-w-[300px] space-y-4 rounded-xl border p-5 shadow-lg">
        <p className="flex items-center gap-1">
          <span className="text-lg font-bold">
            {formatPrice(property.pricePerNight)}
          </span>
          per night
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              {formattedFrom} — {formattedTo}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0" align="end">
            <Calendar
              mode="range"
              selected={selectedRange}
              onSelect={setSelectedRange}
              numberOfMonths={2}
              fixedWeeks
            />
          </PopoverContent>
        </Popover>
        <Button
          disabled={!isValidRange}
          className="w-full rounded-full"
          size="lg"
        >
          Reserve
        </Button>
      </div>
    </div>
  );
};
