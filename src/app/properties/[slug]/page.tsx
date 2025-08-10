import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { placeholderAvatar } from "@/constants";
import { Amenities } from "@/features/properties/components/amenities";
import { PropertyGridView } from "@/features/properties/components/property-grid-view";
import { RatingBadge } from "@/features/properties/components/rating-badge";
import { StickyReservationCard } from "@/features/properties/components/sticky-reservation-card";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { getPropertyDataInclude, Params } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

const PropertyDetailsPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const refinedSlug = slug.split("-").slice(1).join("-");
  const user = await getCurrentUser();
  const property = await db.property.findUnique({
    where: { slug: refinedSlug },
    include: {
      ...getPropertyDataInclude(user.id),
      owner: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  if (!property) {
    return notFound();
  }

  return (
    <div className="py-5 max-w-[1100px] mx-auto">
      <Heading>{property.title}</Heading>
      <PropertyGridView images={property.images} />
      <Heading elem="h2" className="mt-3">
        {property.roomType} in {property.city}, {property.country}
      </Heading>
      <div className="flex justify-between gap-10">
        <div>
          <p className="text-muted-foreground flex items-center gap-1.5 text-sm font-medium">
            <span>{property.guestCount} Guest</span>
            <span className="-translate-y-0.5">.</span>
            <span>{property.bedroomCount} Bathrooms</span>
            {!!property.bathroomCount && (
              <>
                <span className="-translate-y-0.5">.</span>
                <span>{property.bathroomCount} Bathrooms</span>
              </>
            )}
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Image
              src={property.owner.image || placeholderAvatar}
              alt="Owner"
              width={40}
              height={40}
              className="shrink-0 rounded-full"
            />
            <div className="font-medium">
              <h5>{property.owner.name}</h5>
              <p className="text-muted-foreground text-sm">New as a host</p>
            </div>
          </div>
          <Separator className="my-8" />
          <section>
            <Heading>About this place</Heading>
            <div
              className="prose mt-3"
              dangerouslySetInnerHTML={{ __html: property.description }}
            />
          </section>
          <Separator className="my-8" />
          <Amenities amenities={property.amenities} />
        </div>
        <StickyReservationCard property={property} />
      </div>
      <Separator className="my-8" />
      <RatingBadge rating={4.5} />
    </div>
  );
};

export default PropertyDetailsPage;
