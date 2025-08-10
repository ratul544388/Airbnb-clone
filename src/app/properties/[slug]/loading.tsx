import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-main flex items-center justify-center">
      <Loader2 className="text-primary size-10 animate-spin" />
    </div>
  );
};

export default Loading;
