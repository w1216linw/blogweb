import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Layout from "../../components/base/Layout";
import PostControl from "../../components/post/PostControl";
import UpdootSection from "../../components/post/UpdootSection";
import { useMeQuery, usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import toPastTime from "../../utils/toPastTime";
import { useGetIntId } from "../../utils/useGetIntId";

export const Post = () => {
  const postIntId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: postIntId === -1,
    variables: {
      id: postIntId,
    },
  });

  if (fetching) {
    return <div>loading</div>;
  }

  if (!data.post) {
    return <div>Could not find the post</div>;
  }

  return (
    <Layout variant="regular">
      <Grid
        templateAreas={`
        'vote header'
         '. main'
         '. main'
         '. control'
         `}
        templateColumns={"5rem 1fr"}
        py="2rem"
        rowGap="1rem"
      >
        <GridItem area="vote">
          <UpdootSection post={data.post} />
        </GridItem>
        <GridItem area="header">
          <Text>
            {`${data.post.creator.username} \u00B7 ${toPastTime(
              parseInt(data.post.createdAt)
            )}`}
          </Text>
          <Heading>{data.post.title}</Heading>
        </GridItem>
        <GridItem area="main">
          <Box>{data.post.text}</Box>
        </GridItem>
        <GridItem area="control">
          <PostControl
            inline
            id={data.post.id}
            creatorId={data.post.creatorId}
          />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
