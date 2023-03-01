import React from "react";
import FormContainer from "./FormContainer";
import { NavBar } from "./NarBar";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  children: JSX.Element;
  variant: WrapperVariant;
  input?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, variant, input }) => {
  if (input) {
    return (
      <>
        <NavBar />
        <FormContainer>{children}</FormContainer>
      </>
    );
  }
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
