import { useNavigate } from "react-router-dom";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Flex
      width="100%"
      height="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="15px"
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="2px"
      >
        <Text fontSize="40px">🚩</Text>
        <Heading
          as="h3"
          size={{ base: "md", lg: "md" }}
          color="primary.50"
          fontWeight="500"
        >
          ¿Te perdiste?
        </Heading>
        <Heading
          as="h3"
          size={{ base: "sm", lg: "sm" }}
          color="primary.100"
          fontWeight="400"
          textAlign="center"
        >
          No encontramos la página que buscabas.
        </Heading>
      </Flex>
      <Button variant="tertiary" size="sm" onClick={() => navigate("/")}>
        Volver
      </Button>
    </Flex>
  );
};

export default NotFoundPage;
