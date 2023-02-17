import { Flex, Heading, Box, Text} from "@chakra-ui/react";
import PostControl from "./PostControl";
import UpdootSection from "./UpdootSection";
import NextLink from "next/link";

interface PostCardProps {
  post: any
}

const PostCard: React.FC<PostCardProps> = ({post: p}) => {
  return (
    <Flex key={p.id} p={5} shadow="md" gap="4" bg="darkReg">
      <UpdootSection post={p} />
      <Box>
        <NextLink href="/post/[id]" as={`/post/${p.id}`}>
          <Heading>{p.title}</Heading>
        </NextLink>
        <Text>Posted by {p.creator.username}</Text>
        <Text>{p.textSnippet}...</Text>
      </Box>
      <Box ms={"auto"}>
        <PostControl id={p.id} creatorId={p.creatorId} />
      </Box>
    </Flex>
  );
};

export default PostCard;
