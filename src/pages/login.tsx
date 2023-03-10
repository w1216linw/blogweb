import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { InputField } from "../components/base/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import FormContainer from "../components/base/FormContainer";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const toast = useToast();
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <FormContainer>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            toast({
              title: "Hello",
              description: "You have been logged in",
              status: "success",
              duration: 1000,
              isClosable: true,
            });
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="username or email"
            />
            <InputField
              name="password"
              placeholder="password"
              label="password"
              type="password"
            />
            <Flex>
              <NextLink href="/register">New user?</NextLink>
              <Box ml={"auto"}>
                <NextLink href="/forgotPassword">Forget Password</NextLink>
              </Box>
            </Flex>
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="orange"
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
