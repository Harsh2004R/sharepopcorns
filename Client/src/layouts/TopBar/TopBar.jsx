import React from "react";
import logo from "../../logo/logo_nobg.svg";
import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";

function TopBar() {
  return (
    <Box w="100%" h="60px" bg="white">
      <Flex w="100%" h="100%">
        <Center>
          <Image
            src={logo}
            alt="SharePopcorns logo"
            width="65px"
            height="55px"
            objectFit="contain"
          />
        </Center>
        <Flex alignItems="flex-end" flex="1">
          <Text
            color="primaryDark"
            justifyContent="flex-start"
            fontFamily={"header"}
            letterSpacing={"0.5px"}
            fontSize={"30px"}
          >
            Sharepopcorns
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default TopBar;
