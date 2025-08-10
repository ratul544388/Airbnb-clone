"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";

import { FormInput } from "@/components/form/form-input";
import { FormMultiSelect } from "@/components/form/form-multi-select";
import { FormSelect } from "@/components/form/form-select";
import { ImageUpload } from "@/components/image-upload";
import { LoadingButton } from "@/components/loading-button";
import {
  RichTextEditor
} from "@/components/rich-text-editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AMENITIES_MAP,
  COUNTRY_CITY_MAP,
  PROPERTY_TYPES,
  ROOM_TYPES,
  RULES,
} from "@/constants";
import { tryCatch } from "@/lib/try-catch";
import { PropertyData } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProperty, updateProperty } from "../actions";
import { propertySchema, PropertyValues } from "../validations";

export function PropertyForm({ property }: { property?: PropertyData }) {
  const isFirstRender = useRef(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<PropertyValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      images: property?.images.map(({ url, order }) => ({ url, order })) || [],
      title: property?.title || "",
      type: (property?.type as PropertyValues["type"]) || "",
      roomType: (property?.roomType as PropertyValues["roomType"]) || "",
      guestCount: property?.guestCount || 0,
      bedroomCount: property?.bedroomCount || 0,
      bathroomCount: property?.bedroomCount || 0,
      pricePerNight: property?.pricePerNight || 0,
      amenities: (property?.amenities as PropertyValues["amenities"]) || [],
      rules: (property?.rules as PropertyValues["rules"]) || [],
      country: property?.country || "",
      city: property?.city || "Delhi",
      address: property?.address || "",
      description: property?.description || "",
    },
  });

  async function onSubmit(values: PropertyValues) {
    startTransition(async () => {
      const { error, data } = await tryCatch(
        property ? updateProperty(property.id, values) : createProperty(values),
      );
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success(data.message);
      router.push("/dashboard/my-properties");
    });
  }

  form.watch("images");
  form.watch("country");
  form.watch("city");
  const country = form.getValues("country");
  const cities = COUNTRY_CITY_MAP[country] || [];

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender.current = false;
      return;
    }
    form.setValue("city", "");
  }, [country, form]);


  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <CardTitle>
          {property ? "Edit Your Property" : "Create a New Property"}
        </CardTitle>
        <CardDescription>
          {property
            ? "Update the details of your existing property listing. Make changes and save when you're ready."
            : "Fill out the details to list a new property for booking. Complete the form and publish your listing."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      images={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormInput
              control={form.control}
              name="title"
              placeholder="Enter your property Title"
            />
            <FormSelect
              control={form.control}
              name="type"
              label="Property Type"
              options={PROPERTY_TYPES}
              placeholder="Select property type"
            />
            <FormSelect
              control={form.control}
              name="roomType"
              label="Room Type"
              options={ROOM_TYPES}
              placeholder="Select room type"
            />
            <FormInput
              control={form.control}
              name="pricePerNight"
              label="Price Per Night"
              type="number"
              placeholder="Enter your property Price"
            />
            <FormSelect
              control={form.control}
              name="country"
              options={Object.keys(COUNTRY_CITY_MAP)}
              placeholder="Select the country"
            />
            {country && (
              <FormSelect
                control={form.control}
                name="city"
                options={cities}
                placeholder="Select the country"
              />
            )}
            <FormInput
              control={form.control}
              name="address"
              placeholder="Enter the propery's full address"
            />
            <FormInput
              control={form.control}
              name="guestCount"
              label="Guest Count"
              placeholder="Enter Guest count"
              description="Enter the guest count excluding children who are under the age of 5"
            />
            <FormInput
              control={form.control}
              name="bedroomCount"
              label="Bedroom Count"
              placeholder="Enter Bedroom count"
            />
            <FormInput
              control={form.control}
              name="bathroomCount"
              label="Bathroom Count"
              placeholder="Enter Bathroom count"
            />
            <FormMultiSelect
              control={form.control}
              name="amenities"
              options={Object.keys(AMENITIES_MAP)}
              placeholder="Select amenities"
            />
            <FormMultiSelect
              control={form.control}
              name="rules"
              options={RULES}
              placeholder="Select amenities"
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              isLoading={isPending}
              loadingLabel={property ? "Saving" : "Creating"}
              type="submit"
              className="ml-auto w-fit"
            >
              {property ? "Save" : "Create"}
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
