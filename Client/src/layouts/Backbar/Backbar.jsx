import { Flex, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeft, Clapperboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Backbar = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Flex
      align="center"
      justify="center"
      position="relative"
      px={0}
      py={4}
      w="full"
      bg="white"
      boxShadow="0 0 15px rgba(0, 0, 0, 0.08)"
    >
      <IconButton
        aria-label="Go back"
        variant="ghost"
        position="absolute"
        left={1}
        size={24}
        onClick={() => navigate(-1)}
        _hover={{ bg: "transparent", opacity: 0.7 }}
      >
        <ChevronLeft size={28} color="#1E1E2E" strokeWidth={2.5} />
      </IconButton>
      <Flex align="center" gap={2}>
        <Clapperboard size={24} color="#A8394C" strokeWidth={2} />
        <Text
          fontSize="2xl"
          fontFamily={"body"}
          fontWeight="semibold"
          color="black"
        >
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Backbar;
