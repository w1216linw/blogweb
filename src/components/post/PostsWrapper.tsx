import { Box, Stack, Flex, Button } from "@chakra-ui/react";
import { paginator } from "../../pages";
import PostCard from "./PostCard";

interface PostsWrapperProps {
  data: any;
  variables: paginator;
  setVariables: (paginator: paginator) => void;
}

const PostsWrapper: React.FC<PostsWrapperProps> = ({
  data,
  variables,
  setVariables,
}) => {
  return (
    <Box p="0">
      <Box>
        <Stack spacing={8}>
          {data?.posts.map((p) =>
            !p ? null : <PostCard post={p} key={p.id} />
          )}
        </Stack>
      </Box>
      {data && data?.hasMore ? (
        <Flex>
          <Button
            m="auto"
            my="8"
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts[data.posts.length - 1].createdAt,
              });
            }}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Box>
  );
};

export default PostsWrapper;
