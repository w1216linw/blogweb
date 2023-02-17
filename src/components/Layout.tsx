import React from "react";
import { NavBar } from "./NarBar";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  children: JSX.Element;
  variant: WrapperVariant;
}

const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
