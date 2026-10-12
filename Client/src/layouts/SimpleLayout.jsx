import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Text } from "@chakra-ui/react";
import Footer from "./Footer/Footer.jsx";
export const SimpleLayout = () => {
  return (
    <Box minH="100vh" w="full" bg="white" overflowX="hidden">
      <Container maxW={"1550px"} minH="100vh" mx="auto" p={0} bg="#FAFAF5">
        {/* TopBar */}

        <Box as="main" flex="1" w="full">
          <Suspense
            fallback={
              <Text p={8} color="text.muted">
                Loading...
              </Text>
            }
          >
            {/* Simple Layout Content */}
            <Box w="100%" px={{ base: "2", md: "50px", lg: "80px" }}>
              <Outlet />
            </Box>
          </Suspense>
        </Box>

        <Footer />
      </Container>
    </Box>
  );
};

export default SimpleLayout;
