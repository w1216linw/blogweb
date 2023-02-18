import { Container, useColorModeValue } from "@chakra-ui/react";

interface FormContainer {
  children: JSX.Element;
}

const FormContainer = ({ children }) => {
  return (
    <Container
      maxW="lg"
      bg={useColorModeValue("LightMode.primary.400", "DarkMode.primary.400")}
      p="2rem"
      borderRadius='md'
      my={'2rem'}
    >
      {children}
    </Container>
  );
};

export default FormContainer;
