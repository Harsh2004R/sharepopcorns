import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box bg="white" minH="100vh" py={10} position="relative">
      {/* Main Layout Area */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        w="full"
        maxW="4xl"
        mx="auto"
      >
        {/* Background GIF section */}

        <Box className="four_zero_four_bg" w="full" textAlign="center">
          <Text
            color={"black"}
            fontSize="50px"
            fontFamily={"heading"}
            fontWeight="bold"
            m={0}
          >
            404
          </Text>
        </Box>
        <Box mt="-50px" textAlign="center">
          <Text
            fontFamily={"body"}
            color="black"
            fontSize="40px"
            fontWeight="bold"
            mb={2}
          >
            Look's like you're lost
          </Text>
          <Text fontFamily={"body"} fontSize="lg" mb={6} color="gray.600">
            the page you are looking for is not available!
          </Text>
        </Box>
        <Button
          onClick={() => navigate("/")}
          color="black"
          px={8}
          py={6}
          fontFamily={"body"}
          borderRadius="sm"
          _hover={{ bg: "primary", color: "white" }}
          fontWeight="normal"
          fontSize="lg"
          bg={"secondary"}
        >
          Go to Home
        </Button>
        {/* Text and Button content */}
      </Flex>
      <style>
        {`
                 
        
                  .four_zero_four_bg {
                    background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
                    height: 400px;
                    background-position: center;
                    background-repeat: no-repeat;
                  }
                `}
      </style>
    </Box>
  );
};

export default NotFound;
