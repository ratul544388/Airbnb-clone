"use server";

import { db } from "@/lib/db";
import { generateBase64Image } from "@/lib/generate-base64-image";
import { getCurrentUser } from "@/lib/get-current-user";
import { requireUser } from "@/lib/require-user";
import { getPropertyDataInclude, Response } from "@/types";
import { Prisma, Property } from "@prisma/client";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { propertySchema, PropertyValues } from "./validations";

type GetPropertypeProps = {
  wishlist?: boolean;
  myProperties?: boolean;
  city?: string;
};

export const getProperties = async ({
  wishlist,
  myProperties,
  city,
}: GetPropertypeProps = {}) => {
  const user = await getCurrentUser({ required: false });
  try {
    const properties = await db.property.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        ...(wishlist
          ? {
              wishlists: {
                some: {
                  userId: user?.id,
                },
              },
            }
          : {}),
        ...(myProperties
          ? {
              ownerId: user?.id,
            }
          : {}),
        ...(city ? { city } : {}),
      },
      include: getPropertyDataInclude(user?.id),
    });

    return properties;
  } catch (err) {
    console.error("Error fetching properties:", err);
    throw err;
  }
};

export const createProperty = async (values: PropertyValues): Response => {
  const user = await requireUser();
  try {
    const parsedValues = propertySchema.parse(values);
    const slug = slugify(parsedValues.title, {
      lower: true,
      strict: true,
      trim: true,
    });

    const imagesData: Prisma.PropertyImageCreateManyPropertyInput[] =
      await Promise.all(
        parsedValues.images.map(async ({ order, url }) => {
          const blurDataUrl = await generateBase64Image(url);
          return {
            order,
            url,
            blurDataUrl,
          };
        }),
      );

    await db.property.create({
      data: {
        ...parsedValues,
        slug,
        ownerId: user.id,
        country: "Bangladesh",
        images: {
          createMany: {
            data: imagesData,
          },
        },
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/my-properties");

    return { success: true, message: "Property created" };
  } catch (err) {
    console.error("Create property error:", err);
    return { success: false, message: "Something went wrong" };
  }
};

export const updateProperty = async (
  id: string,
  values: PropertyValues,
): Response => {
  const user = await requireUser();

  try {
    const parsedValues = propertySchema.parse(values);

    const existingProperty = await db.property.findUnique({
      where: { id },
    });

    if (!existingProperty || existingProperty.ownerId !== user.id) {
      return { success: false, message: "Unauthorized or property not found" };
    }

    let uniqueSlug = existingProperty.slug;

    if (parsedValues.title !== existingProperty.title) {
      const baseSlug = slugify(parsedValues.title, {
        lower: true,
        strict: true,
        trim: true,
      });

      uniqueSlug = baseSlug;
      let counter = 1;

      while (
        await db.property.findFirst({
          where: {
            slug: uniqueSlug,
            NOT: { id },
          },
        })
      ) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const imagesData: Prisma.PropertyImageCreateManyPropertyInput[] =
      await Promise.all(
        parsedValues.images.map(async ({ order, url }) => {
          const blurDataUrl = await generateBase64Image(url);
          return {
            order,
            url,
            blurDataUrl,
          };
        }),
      );

    await db.property.update({
      where: { id },
      data: {
        ...parsedValues,
        slug: uniqueSlug,
        images: {
          deleteMany: {},
          createMany: {
            data: imagesData,
          },
        },
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/my-properties");

    return { success: true, message: "Property updated" };
  } catch (err) {
    console.error("Update property error:", err);
    return { success: false, message: "Something went wrong" };
  }
};

export const deleteProperty = async (id: Property["id"]): Response => {
  const user = await getCurrentUser();
  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        properties: {
          delete: {
            id,
          },
        },
      },
    });

    revalidatePath("/dashboard/my-properties");
    return { success: true, message: "Property Deleted" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};
