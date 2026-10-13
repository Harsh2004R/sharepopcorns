import { Flex, Box, Text, VStack } from "@chakra-ui/react";
import { Home, Ticket, Plus, Sparkles, Smile } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Bottombar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const NavItem = ({ name, Icon, path }) => {
    const isActive = location.pathname === path;

    // Map directly to your custom theme tokens
    const activeColor = isActive ? "primary" : "text";

    return (
      <VStack
        gap={1}
        cursor="pointer"
        onClick={() => navigate(path)}
        flex={1}
        justify="flex-end"
        h="full"
        pb={2}
        color={activeColor} // Parent handles the Chakra theme color
      >
        {/* Icon and Text inherit the color from VStack */}
        <Icon size={26} color="currentColor" strokeWidth={isActive ? 2.5 : 2} />
        <Text
          fontFamily={"body"}
          fontSize={{ base: "xs", md: "sm" }}
          fontWeight="bold"
          color="inherit"
        >
          {name}
        </Text>
      </VStack>
    );
  };

  const isAddActive = location.pathname === "/add";

  return (
    <Box
      position="fixed"
      bottom={0}
      left="50%"
      transform="translateX(-50%)"
      w="full"
      maxW="xl"
      bg="white"
      boxShadow="0 -2px 15px rgba(0, 0, 0, 0.05)"
      px={2}
      h="80px"
      borderTopRadius="3xl"
    >
      <Flex
        justify="space-between"
        align="flex-end"
        h="full"
        maxW="md"
        mx="auto"
      >
        <NavItem name="Home" Icon={Home} path="/" />
        <NavItem name="Collection" Icon={Ticket} path="/collection" />

        {/* Center Floating Action Button (Add) */}
        <VStack
          gap={1}
          cursor="pointer"
          flex={1}
          justify="flex-end"
          h="full"
          pb={2}
          position="relative"
          onClick={() => navigate("/add")}
        >
          <Flex
            position="absolute"
            top="-24px"
            bg="secondary" // Theme token: "#FFD166"
            color="text" // Theme token for the plus icon: "#594E50"
            w="64px"
            h="64px"
            borderRadius="full"
            align="center"
            justify="center"
            boxShadow="0 4px 12px rgba(255, 209, 102, 0.3)"
          >
            <Plus
              size={32}
              color="currentColor"
              strokeWidth={isAddActive ? 3.5 : 2.5}
            />
          </Flex>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="semibold"
            fontFamily={"body"}
            color={isAddActive ? "primary" : "neutral"} // Theme tokens
          >
            Add
          </Text>
        </VStack>

        <NavItem name="Explore" Icon={Sparkles} path="/explore" />
        <NavItem name="Profile" Icon={Smile} path="/profile" />
      </Flex>
    </Box>
  );
};

export default Bottombar;
