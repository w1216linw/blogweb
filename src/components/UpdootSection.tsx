import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { PostsQuery, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostsQuery["posts"]["posts"][0];
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  return (
    <Flex direction={"column"} alignItems="center" gap="2">
      <IconButton
        onClick={async () => {
          if(post.voteState === 1) {
            return
          }
          await vote({ value: 1, postId: post.id})}
        }
        colorScheme={post.voteState === 1 ? 'green' : undefined}
        aria-label="like post"
        icon={<ChevronUpIcon boxSize={6} />}
      />
      {post.points}
      <IconButton
        onClick={async () => {
          if(post.voteState === -1) {
            return
          }
          await vote({ value: -1, postId: post.id })}
        }
        colorScheme={post.voteState === -1 ? 'red' : undefined}
        aria-label="unlike post"
        icon={<ChevronDownIcon boxSize={6} />}
      /> 
    </Flex>
  );
};

export default UpdootSection;
