import React from "react";
import { Formik, Form } from "formik";
import { Button, useToast } from "@chakra-ui/react";
import { InputField } from "../components/base/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import FormContainer from "../components/base/FormContainer";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const toast = useToast();
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <FormContainer>
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
            toast({
              title: "Hello",
              description: "You have been logged in",
              status: "success",
              duration: 1000,
              isClosable: true,
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="username"
            />
            <InputField name="email" placeholder="email" label="email" />
            <InputField
              name="password"
              placeholder="password"
              label="password"
              type="password"
            />
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="orange"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
