import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import ErrorMsg from "../components/ErrorMsg";
import Layout from "../components/Layout";
import PostsWrapper from "../components/PostsWrapper";
import { useMyPostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const MyPosts = () => {
  useIsAuth();
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{data, error}] = useMyPostsQuery({
    variables
  });

  if (error) {
    return <ErrorMsg error={error} />
  }

  return (
    <Box w="100%" h="100%">
      <Layout variant="regular">
        <PostsWrapper
            data={data?.myPosts}
            variables={variables}
            setVariables={setVariables}
          />
      </Layout>
    </Box>
  )
}

export default withUrqlClient(createUrqlClient)(MyPosts);