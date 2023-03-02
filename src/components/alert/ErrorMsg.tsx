import { Center, Heading } from "@chakra-ui/react";
import { CombinedError } from "urql";

interface ErrorMsgProps {
  error: CombinedError
}

const ErrorMsg = ({error}) => {
  return (
    <Center h="100vh">
          <Heading display={"block"}>{error?.message}</Heading>
    </Center>
  )
}

export default ErrorMsg;