import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import NextLink from 'next/link';
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface PostControlProps {
  id: number;
  creatorId: number;
}

const PostControl: React.FC<PostControlProps> = ({ id, creatorId }) => {
  const [{data}] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  if(data?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Flex gap="2">
      <NextLink href={"/post/edit/[id]"} as={`/post/edit/${id}`}>
        <IconButton
          aria-label="edit post"
          icon={<EditIcon boxSize={5} />}
          onClick={() => {}}
        />
      </NextLink>
      <IconButton
        aria-label="delete post"
        icon={<DeleteIcon boxSize={5} />}
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Flex>
  );
};

export default PostControl;
