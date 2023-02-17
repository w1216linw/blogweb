import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql"
import Layout from "../../components/Layout";
import PostControl from "../../components/PostControl";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient"
import { useGetIntId } from "../../utils/useGetIntId";

export const Post = ({}) => {
  const postIntId = useGetIntId();
  const [{data, fetching}] = usePostQuery({
    pause: postIntId === -1,
    variables: {
      id: postIntId
    }
  });

  if(fetching) {
    return (
      <div>loading</div>
    )
  }

  if(!data.post) {
    return (
      <div>Could not find the post</div>
    )
  }

  return (
    <Layout variant="regular">
      <main>
        <h3>{data.post.title}</h3>
        <Box>{data.post.text}</Box>
        <Box>
          <PostControl id={data.post.id} creatorId={data.post.creatorId}/>
        </Box>
      </main>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Post);