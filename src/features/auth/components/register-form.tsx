"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
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
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerSchema, RegisterValues } from "../validations";
import { OauthLogin } from "./oauth-login";
import { cn } from "@/lib/utils";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: RegisterValues) {
    startTransition(async () => {
      try {
        await authClient.signUp.email({
          ...values,
          fetchOptions: {
            onSuccess: async () => {
              await authClient.signIn.email({
                email: values.email,
                password: values.password,
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Regsiter success");
                    router.push("/");
                    router.refresh();
                  },
                },
              });
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
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>
          Join us to manage bookings and discover exclusive offers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OauthLogin />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormInput
              control={form.control}
              name="name"
              placeholder="Enter your name"
            />
            <FormInput
              control={form.control}
              name="email"
              placeholder="Enter your email"
              disabled={isPending}
            />
            <FormPasswordInput
              control={form.control}
              name="password"
              placeholder="Create a password"
              disabled={isPending}
            />
            <LoadingButton
              isLoading={isPending}
              loadingLabel="Registering"
              disabled={isPending}
              type="submit"
            >
              Sign Up
            </LoadingButton>
            <div className="flex justify-center gap-1 text-center text-sm font-medium">
              Do not have an account?
              <Link
                href="/login"
                className={cn(
                  "hover:underline",
                  isPending && "pointer-events-none opacity-60",
                )}
              >
                Login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
