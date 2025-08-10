import { DataTable } from "@/components/data-table";
import { buttonVariants } from "@/components/ui/button";
import { getProperties } from "@/features/properties/actions";
import { DeletePropertyModal } from "@/features/properties/components/delete-property-modal";
import { columns } from "@/features/properties/components/table/columns";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const MyProperties = async () => {
  const properties = await getProperties({ myProperties: true });

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/dashboard/my-properties/new"
        className={buttonVariants({ className: "ml-auto" })}
      >
        New
        <PlusCircle className="size-4" />
      </Link>
      <DataTable columns={columns} data={properties} />
      <DeletePropertyModal/>
    </div>
  );
};

export default MyProperties;
