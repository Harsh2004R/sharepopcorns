// src/components/layout/AdminLayout.jsx
import { Suspense } from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { Box, Flex, Text, VStack, Icon, HStack } from "@chakra-ui/react";

const AdminLayout = () => {
  return (
    <Flex minH="100vh" w="full" bg="gray.100">
      {/* 
        ADMIN SIDEBAR 
        Using a dark theme (gray.900) to visually separate it from the Vendor and Public layouts 
      */}
      <Box w="260px" bg="gray.900" color="white" flexShrink={0}>
        <Flex
          h="60px"
          align="center"
          px={6}
          borderBottom="1px"
          borderColor="gray.700"
        >
          <Text fontSize="xl" fontWeight="black" tracking="widest">
            ADMIN OVERSEER
          </Text>
        </Flex>

        <VStack align="stretch" spacing={2} p={4}>
          <RouterLink to="/admin/dashboard">
            <Box
              px={4}
              py={3}
              rounded="md"
              _hover={{ bg: "gray.700" }}
              transition="all 0.2s"
            >
              <Text fontWeight="medium">Dashboard</Text>
            </Box>
          </RouterLink>

          <RouterLink to="/admin/users">
            <Box
              px={4}
              py={3}
              rounded="md"
              _hover={{ bg: "gray.700" }}
              transition="all 0.2s"
            >
              <Text fontWeight="medium">Manage Users</Text>
            </Box>
          </RouterLink>

          <RouterLink to="/admin/vendors">
            <Box
              px={4}
              py={3}
              rounded="md"
              _hover={{ bg: "gray.700" }}
              transition="all 0.2s"
            >
              <Text fontWeight="medium">Manage Vendors</Text>
            </Box>
          </RouterLink>

          <RouterLink to="/admin/settings">
            <Box
              px={4}
              py={3}
              rounded="md"
              _hover={{ bg: "gray.700" }}
              transition="all 0.2s"
            >
              <Text fontWeight="medium">Site Settings & Flags</Text>
            </Box>
          </RouterLink>

          {/* Divider */}
          <Box h="1px" bg="gray.700" my={4} mx={4} />

          <RouterLink to="/">
            <Box
              px={4}
              py={3}
              rounded="md"
              color="gray.400"
              _hover={{ bg: "gray.800", color: "white" }}
              transition="all 0.2s"
            >
              <Text fontSize="sm">← Back to Storefront</Text>
            </Box>
          </RouterLink>
        </VStack>
      </Box>

      {/* MAIN CONTENT AREA */}
      <Flex flex="1" direction="column" overflow="hidden">
        {/* ADMIN TOP HEADER */}
        <Flex
          h="60px"
          bg="white"
          shadow="sm"
          align="center"
          justify="space-between"
          px={8}
        >
          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
            System Administration
          </Text>

          <HStack spacing={4}>
            <Text fontSize="sm" color="gray.500">
              Role: Super Admin
            </Text>
            {/* You could add a user avatar or logout button here */}
          </HStack>
        </Flex>

        {/* PAGE CONTENT */}
        <Box as="main" flex="1" p={8} overflowY="auto">
          <Suspense
            fallback={
              <Flex w="full" h="full" align="center" justify="center">
                <Text color="gray.500">Loading Admin Module...</Text>
              </Flex>
            }
          >
            <Outlet />
          </Suspense>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AdminLayout;
