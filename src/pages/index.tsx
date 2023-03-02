import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import ErrorMsg from "../components/alert/ErrorMsg";
import Layout from "../components/base/Layout";
import PostCard from "../components/post/PostCard";
import PostsWrapper from "../components/post/PostsWrapper";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

export interface paginator {
  limit: number;
  cursor: null | string;
}

const Index = () => {
  const [variables, setVariables] = useState<paginator>({
    limit: 10,
    cursor: null,
  });
  const [{ data, error }] = usePostsQuery({
    variables: variables,
  });

  if (!data?.posts) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return <ErrorMsg error={error} />;
  }

  return (
    <Box w="100%" h="100%">
      <Layout variant="regular">
        <PostsWrapper
          data={data.posts}
          variables={variables}
          setVariables={setVariables}
        />
      </Layout>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
