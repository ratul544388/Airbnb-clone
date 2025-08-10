import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import { User } from "better-auth";
import { cache } from "react";

type GetCurrentUserOptions = {
  required?: boolean;
};

export const getCurrentUser = cache(
  async <T extends GetCurrentUserOptions = { required: true }>(
    options?: T,
  ): Promise<T["required"] extends false ? User | null : NonNullable<User>> => {
    const session = await auth.api.getSession({ headers: await headers() });

    const user = session?.user;

    if (!user && options?.required !== false) {
      redirect("/login");
    }

    return user as User;
  },
);
