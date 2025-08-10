import { PropsWithChildren } from "react";
import { Sidebar } from "./components/sidebar";

const DashboardLayout = async ({ children }: PropsWithChildren) => {

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-main w-full overflow-hidden py-4 sm:pl-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
