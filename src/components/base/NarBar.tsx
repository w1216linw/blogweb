import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import ColorModeSwitcher from "./ColorModeSwitcher";

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data }] = useMeQuery();
  let user = "";
  let body = null;

  if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">login</NextLink>
        <NextLink href="/register">register</NextLink>
      </>
    );
  } else {
    user = data.me.username;
    body = (
      <Flex gap={2} align="center">
        <Button mr="2rem" colorScheme="gray">
          <NextLink href="/create-post">Create Post</NextLink>
        </Button>
        <Button mr="2rem" colorScheme="gray">
          <NextLink href="/myposts">My Posts</NextLink>
        </Button>
        <Heading size="md">{data.me.username}</Heading>
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
      bg={useColorModeValue("LightMode.primary.300", "DarkMode.primary.500")}
      color="lightLight"
      p={4}
      align="center"
      justify={"space-between"}
    >
      <NextLink href="/">
        <Heading>Blog</Heading>
      </NextLink>

      <Flex ml={"auto"} gap={2} align="center" display={["none", "flex"]}>
        {body}
      </Flex>

      <Flex align="center" gap={3}>
        <ColorModeSwitcher />
        <IconButton
          aria-label="menu toggle"
          icon={<HamburgerIcon />}
          onClick={() => onOpen()}
          key="full"
          display={["block", "none"]}
        />
      </Flex>

      <Drawer onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>User: {user}</DrawerHeader>
          <DrawerBody>
            <Flex direction="column" gap={2} align="center">
              <Button colorScheme="gray" minW="10rem">
                <NextLink href="/create-post">Create Post</NextLink>
              </Button>
              <Button
                minW="10rem"
                colorScheme="gray"
                onClick={() => {
                  logout({});
                  router.reload();
                }}
                isLoading={logoutFetching}
              >
                logout
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
