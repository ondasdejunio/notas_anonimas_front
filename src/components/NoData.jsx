import { Flex, Heading, Text } from "@chakra-ui/react";

const NoData = () => {
  return (
    <Flex
      width="100%"
      height="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="5px"
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="2px"
      >
        <Text fontSize="40px">💭</Text>
        <Heading
          as="h3"
          size={{ base: "md", lg: "md" }}
          color="primary.50"
          fontWeight="500"
        >
          Vacío...
        </Heading>
        <Heading
          as="h3"
          size={{ base: "sm", lg: "sm" }}
          color="primary.100"
          fontWeight="400"
          textAlign="center"
        >
          No hay nada que mostrar.
        </Heading>
      </Flex>
    </Flex>
  );
};

export default NoData;
