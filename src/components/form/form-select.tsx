import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Control, FieldValues, Path } from "react-hook-form";

type Option = string | { label: string; value: string };

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: readonly Option[];
  placeholder?: string;
  disabled?: boolean;
  description?: string;
  optional?: boolean;
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select an option",
  disabled = false,
  description,
  optional,
}: FormSelectProps<T>) {
  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt,
  );

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
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {normalizedOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
