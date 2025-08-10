import {
  AMENITIES_MAP,
  COUNTRY_CITY_MAP,
  PROPERTY_TYPES,
  ROOM_TYPES,
  RULES
} from "@/constants";
import { z } from "zod";

export const propertySchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    pricePerNight: z.coerce
      .number<number>({ error: "Price is required" })
      .min(1, "Price is required"),
    country: z.enum(Object.keys(COUNTRY_CITY_MAP), "Country is required"),
    city: z.string().min(1, "City is required"),

    guestCount: z.coerce
      .number<number>({ error: "Guest count is required" })
      .min(1, "Guest count must be at least 1")
      .max(20, "Guest count must not exceed 20"),

    bedroomCount: z.coerce
      .number<number>({ error: "Bedroom count is required" })
      .min(1, "Bedroom count must be at least 1")
      .max(10, "Bedroom count must not exceed 10"),

    bathroomCount: z.coerce
      .number<number>({ error: "Bathroom count is required" })
      .min(0, "Bathroom count must be at least 0")
      .max(10, "Bathroom count must not exceed 10"),

    amenities: z.array(z.enum(Object.keys(AMENITIES_MAP))),
    type: z.enum(PROPERTY_TYPES, "Property Type is required"),
    roomType: z.enum(ROOM_TYPES, "Room Type is required"),
    rules: z.array(z.enum(RULES)),
    address: z.string().min(5, "Address must be at least 5 characters"),
    images: z
      .array(
        z.object({
          url: z.string().min(1, "Url is required"),
          order: z.number().min(1, "Order is required"),
        }),
      )
      .nonempty("At least one image is required"),
  })
  .superRefine(({ country, city }, ctx) => {
    if (!COUNTRY_CITY_MAP[country].includes(city)) {
      ctx.addIssue({
        code: "custom",
        message: `City must be one of: ${COUNTRY_CITY_MAP[country].join(", ")}`,
        path: ["city"],
      });
    }
  });

export type PropertyValues = z.infer<typeof propertySchema>;
