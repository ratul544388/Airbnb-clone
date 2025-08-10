import { Container } from "@/components/container";
import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container elem="main" className="min-h-main mx-auto items-center flex max-w-[500px] justify-center">
      {children}
    </Container>
  );
};

export default AuthLayout;
