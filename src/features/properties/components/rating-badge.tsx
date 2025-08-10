"use client";

import Image from "next/image";

interface RatingBadgeProps {
  rating: number;
}

export const RatingBadge = ({ rating }: RatingBadgeProps) => {
  return (
    <div className="flex items-center py-6 justify-center">
      <div className="relative aspect-[201/306] w-20">
        <Image src="/rating-badge/left.webp" alt="Badge-left" fill />
      </div>
      <p className="font-bold text-5xl -translate-y-5">{rating}</p>
      <div className="relative aspect-[201/306] w-20">
        <Image src="/rating-badge/right.webp" alt="Badge-right" fill />
      </div>
    </div>
  );
};
