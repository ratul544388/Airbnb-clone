"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useModalStore } from "@/hooks/use-modal-store";
import { Property } from "@prisma/client";
import { Edit, Home, MoreVertical, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  property: Property;
}

export const CellAction = ({ property }: CellActionProps) => {
  const router = useRouter();
  const { onOpen } = useModalStore();

  const items = [
    {
      label: "View Property",
      icon: Home,
      onClick: () => router.push(`/properties/${property.id}-${property.slug}`),
    },
    {
      label: "Update Property",
      icon: Edit,
      onClick: () =>
        router.push(`/dashboard/my-properties/${property.id}/edit`),
    },
    {
      label: "Delete Property",
      icon: Trash,
      onClick: () => onOpen("deleteProperty", { id: property.id }),
    },
  ];

  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreVertical className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-fit flex-col px-0 py-2">
        {items.map(({ label, icon: Icon, onClick }) => (
          <Button
            key={label}
            className="justify-start"
            onClick={() => {
              onClick();
              setOpen(false);
            }}
            variant="ghost"
          >
            <Icon className="size-4" />
            {label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
