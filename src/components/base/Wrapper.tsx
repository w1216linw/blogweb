import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  children: JSX.Element;
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box m={8} mx="auto" maxW={variant === "regular" ? "55em" : "400px"}>
      {children}
    </Box>
  );
};
