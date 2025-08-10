"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "sonner";

import { FormInput } from "@/components/form/form-input";
import { FormPasswordInput } from "@/components/form/form-password-input";
import { LoadingButton } from "@/components/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { loginSchema, LoginValues } from "../validations";
import { OauthLogin } from "./oauth-login";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginValues) {
    startTransition(async () => {
      try {
        await authClient.signIn.email({
          ...values,
          callbackURL: "/",
          fetchOptions: {
            onSuccess: () => {
              toast.success("Logged in");
              router.push("/");
              router.refresh();
            },
            onError: (context) => {
              toast.error(context.error.message);
            },
          },
        });
      } catch {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Sign in to manage your bookings and explore new offers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OauthLogin disabled={isPending} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormInput
              control={form.control}
              name="email"
              placeholder="Enter your email"
              disabled={isPending}
            />
            <FormPasswordInput
              control={form.control}
              name="password"
              placeholder="Enter your password"
              disabled={isPending}
            />
            <LoadingButton
              isLoading={isPending}
              loadingLabel="Logging in"
              type="submit"
            >
              Login
            </LoadingButton>
            <div className="flex justify-center gap-1 text-center text-sm font-medium">
              Do not have an account?
              <Link
                href="/register"
                className={cn(
                  "hover:underline",
                  isPending && "pointer-events-none opacity-60",
                )}
              >
                Register
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
