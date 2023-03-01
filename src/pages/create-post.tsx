import { Button, Container } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../components/base/InputField";
import { useRouter } from "next/router";
import { useCreatePostMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Layout from "../components/base/Layout";
import { useIsAuth } from "../utils/useIsAuth";
import { toErrorMap } from "../utils/toErrorMap";

const createPost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();

  return (
    <Layout variant="small" input>
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createPost({ input: values });
          if (response.data?.createPost.errors) {
            setErrors(toErrorMap(response.data.createPost.errors));
          } else if (response.data?.createPost.post) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <InputField
              name="text"
              placeholder="text..."
              label="Body"
              textarea
            />
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="orange"
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(createPost);
