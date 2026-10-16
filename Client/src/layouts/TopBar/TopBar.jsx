import React from "react";
import logo from "../../logo/logo_nobg.svg";
import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";

function TopBar() {
  return (
    <Box
      //  border="1px solid lime"
      w="100%"
      h="70px"
      bg="white"
      // boxShadow="0 0 15px rgba(0, 0, 0, 0.08)"
    >
      <Flex w="100%" pb="2.5" h="100%">
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
            color="primary"
            justifyContent="flex-start"
            fontFamily={"heading"}
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
