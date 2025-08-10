"use server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { Response } from "@/types";
import { Property } from "@prisma/client";

export const toggleWishList = async (propertyId: Property["id"]): Response => {
  const user = await getCurrentUser();

  try {
    const existingWishlist = await db.wishlist.findUnique({
      where: {
        userId_propertyId: {
          userId: user.id,
          propertyId,
        },
      },
    });

    if (existingWishlist) {
      await db.wishlist.delete({
        where: {
          id: existingWishlist.id,
        },
      });

      return { success: true, message: "Property removed from wishlist" };
    }

    await db.wishlist.create({
      data: {
        propertyId,
        userId: user.id,
      },
    });

    return { success: true, message: "Property added to wishlist" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};
