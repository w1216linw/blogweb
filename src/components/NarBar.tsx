import { Box, Button, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import ColorModeSwitcher from "./ColorModeSwitcher";

export const NavBar = () => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data }] = useMeQuery();

  let body = null;

  if (!data?.me) {
    body = (
      <Flex gap={2}>
        <NextLink href="/login">login</NextLink>
        <NextLink href="/register">register</NextLink>
      </Flex>
    );
  }
  //user is logged in
  else {
    body = (
      <Flex gap={2} align="center">
        <Button mr="2rem" colorScheme="gray">
          <NextLink href="/create-post">Create Post</NextLink>
        </Button>
        <Box>{data.me.username}</Box>
        <Button
          variant="link"
          onClick={() => {
            logout({});
            router.reload();
          }}
          isLoading={logoutFetching}
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      zIndex="1"
      position="sticky"
      top="0"
      bg={useColorModeValue('LightMode.primary.300','DarkMode.primary.500')}
      color="lightLight"
      p={4}
      align="center"
    >
      <NextLink href="/">
        <Heading>Blog</Heading>
      </NextLink>
      <Flex ml={"auto"} gap={2}>
        {body}
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  );
};
