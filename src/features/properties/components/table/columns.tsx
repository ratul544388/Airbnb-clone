"use client";

import { PropertyData } from "@/types";
import { Image } from "@imagekit/next";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatDate, formatPrice } from "@/lib/utils";

export const columns: ColumnDef<PropertyData>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const title = row.original.title;
      const { url, blurDataUrl } = row.original.images[0];
      return (
        <Image
          width={50}
          height={50}
          src={url}
          alt={`${title}'s Image`}
          transformation={[{ width: 50, height: 50 }]}
          className="rounded-lg"
          placeholder="blur"
          blurDataURL={blurDataUrl}
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "pricePerNight",
    header: "Price Per Night",
    cell: ({ row }) => `${formatPrice(row.original.pricePerNight)}`,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => <CellAction property={row.original} />,
  },
];
