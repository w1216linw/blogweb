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
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, error, fetching }] = usePostsQuery({
    variables: variables,
  });

  if (!data) {
    return (
      <Center h="100vh">
          <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
          <Heading display={"block"}>{error?.message}</Heading>
      </Center>
    );
  }

  return (
    <Box w="100%" h="100%">
      <Layout variant="regular">
        <Box p="0">
          <Box>
            {fetching ? (
              <Container>loading...</Container>
            ) : (
              <Stack spacing={8}>
                {data.posts.posts.map((p) =>
                  !p ? null : <PostCard post={p} key={p.id} />
                )}
              </Stack>
            )}
          </Box>
          {data && data.posts.hasMore ? (
            <Flex>
              <Button
                m="auto"
                my="8"
                onClick={() => {
                  setVariables({
                    limit: variables.limit,
                    cursor:
                      data.posts.posts[data.posts.posts.length - 1].createdAt,
                  });
                }}
              >
                load more
              </Button>
            </Flex>
          ) : null}
        </Box>
      </Layout>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
