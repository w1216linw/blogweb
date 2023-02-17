import { Box, Button, Container, Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";
import PostCard from "../components/Post";
import PostControl from "../components/PostControl";
import UpdootSection from "../components/UpdootSection";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, error, fetching }] = usePostsQuery({
    variables: variables,
  });

  if(!data) {
    return <Container><Spinner size='xl' /></Container> 
  }

  if(error) {
    return <Container>{error?.message}</Container>
  }

  return (
    <Layout variant="regular">
      <Box>
        <Box>
          {fetching ? (
            <Container>loading...</Container>
          ) : (
            <Stack spacing={8}>
              {data.posts.posts.map((p) =>
                !p ? null : (
                  <PostCard post={p} key={p.id}/>
                )
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
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
