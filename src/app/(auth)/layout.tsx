import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-main flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
