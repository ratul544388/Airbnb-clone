import { PropertyForm } from "@/features/properties/components/property-form";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { getPropertyDataInclude, Params } from "@/types";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Params }) => {
  const user = await getCurrentUser();
  const { property_id } = await params;
  const property = await db.property.findUnique({
    where: { id: property_id },
    include: getPropertyDataInclude(user.id),
  });

  if (!property) {
    notFound();
  }
  
  return (
    <div>
      <PropertyForm property={property} />
    </div>
  );
};

export default Page;
