import { getProperties } from "@/features/properties/actions";
import { PropertyCard } from "@/features/properties/components/property-card";
import React from "react";

const WishlistPage = async () => {
  const properties = await getProperties({ wishlist: true });

  return (
    <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </ul>
  );
};

export default WishlistPage;
