import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface FormPasswordInputProps<T extends FieldValues>
  extends Omit<React.ComponentProps<"input">, "name"> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  optional?: boolean;
  description?: string;
}

export function FormPasswordInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  autoFocus,
  optional,
  description,
}: FormPasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn("capitalize")}>
            {label || name}
            {optional && " (Optional)"}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                disabled={disabled}
                autoFocus={autoFocus}
                placeholder={placeholder}
                value={field.value || ""}
                onChange={field.onChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="size-4.5" />
                ) : (
                  <Eye className="size-4.5" />
                )}
              </button>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
