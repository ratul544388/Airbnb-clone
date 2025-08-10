import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Control, FieldValues, Path } from "react-hook-form";
import React from "react";
import { Checkbox } from "../ui/checkbox";

type Option = string | { label: string; value: string };

interface FormMultiSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: readonly Option[];
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  optional?: boolean;
}

export function FormMultiSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select options",
  description,
  disabled = false,
  optional = false,
}: FormMultiSelectProps<T>) {
  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt,
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedValues: string[] = field.value || [];

        const toggleValue = (value: string) => {
          if (selectedValues.includes(value)) {
            field.onChange(selectedValues.filter((v) => v !== value));
          } else {
            field.onChange([...selectedValues, value]);
          }
        };

        return (
          <FormItem>
            <FormLabel className="capitalize">
              {label || name}
              {optional && " (Optional)"}
            </FormLabel>

            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !selectedValues?.length && "text-muted-foreground",
                    )}
                    disabled={disabled}
                  >
                    {selectedValues.length > 0
                      ? `${selectedValues.length} selected`
                      : placeholder}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandGroup className="max-h-[50vh] overflow-y-auto">
                    {normalizedOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleValue(option.value)}
                        className="cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedValues.includes(option.value)}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="mt-2 flex flex-wrap gap-1">
              {selectedValues.map((value) => {
                const label =
                  normalizedOptions.find((opt) => opt.value === value)?.label ||
                  value;

                return (
                  <Badge key={value} variant="secondary" className="pr-1">
                    {label}
                    <Button
                      tabIndex={-1}
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleValue(value)}
                      className="hover:text-destructive ml-1 size-4.5"
                    >
                      <X className="size-3" />
                    </Button>
                  </Badge>
                );
              })}
            </div>

            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
