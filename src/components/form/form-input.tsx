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
import React from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues>
  extends React.ComponentProps<"input"> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  optional?: boolean;
  description?: string;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
  autoFocus,
  optional,
  description,
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn("capitalize")}>
            {label || name}
            {optional && `(Optional)`}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              disabled={disabled}
              autoFocus={autoFocus}
              placeholder={placeholder}
              value={field.value || ""}
              onChange={field.onChange}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
