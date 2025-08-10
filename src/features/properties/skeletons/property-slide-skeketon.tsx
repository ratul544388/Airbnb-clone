import { Skeleton } from "@/components/ui/skeleton";

export const PropertySliderSkeleton = () => {
  return (
    <div className="">
      <div className="mb-2 flex items-center gap-2">
        <Skeleton className="h-6.5 w-full max-w-[300px] rounded-sm" />
        <Skeleton className="size-5 rounded" />
      </div>
      <div className="scrollbar-none flex snap-x overflow-x-auto py-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-1/2 shrink-0 snap-start px-1.5 last:pr-0 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
          >
            <div className="flex flex-col gap-2">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="h-4 w-full rounded-sm" />
              <Skeleton className="h-3 w-36 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
