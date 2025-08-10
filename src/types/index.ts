import { Prisma, Property, PropertyImage, User } from "@prisma/client";

export type Element =
  | "div"
  | "section"
  | "main"
  | "header"
  | "footer"
  | "nav"
  | "ul"
  | "aside";

export type Params = Promise<{ [key: string]: string }>;
export type Response = Promise<{ success: boolean; message: string }>;

export type PropertyWithImage = Property & {
  images: PropertyImage[];
};

export const getPropertyDataInclude = (userId: User["id"] | undefined) => {
  return {
    images: true,
    wishlists: {
      where: {
        userId,
      },
      select: {
        id: true,
      },
    },
  } satisfies Prisma.PropertyInclude;
};

export type PropertyData = Prisma.PropertyGetPayload<{
  include: ReturnType<typeof getPropertyDataInclude>;
}>;
