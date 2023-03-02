import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../../generated/graphql";

interface PostControlProps {
  id: number;
  creatorId: number;
  inline?: boolean;
}

const PostControl: React.FC<PostControlProps> = ({ id, creatorId, inline }) => {
  const [{ data }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  if (data?.me?.id !== creatorId) {
    return null;
  }

  if (inline) {
    return (
      <Flex gap="2">
        <NextLink href={"/post/edit/[id]"} as={`/post/edit/${id}`}>
          <Button aria-label="edit post">Edit</Button>
        </NextLink>
        <Button
          aria-label="delete post"
          onClick={() => {
            deletePost({ id });
          }}
        >
          Delete
        </Button>
      </Flex>
    );
  }

  return (
    <Flex gap="2">
      <NextLink href={"/post/edit/[id]"} as={`/post/edit/${id}`}>
        <IconButton aria-label="edit post" icon={<EditIcon boxSize={5} />} />
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
