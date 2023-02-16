import { Flex, Text, Link } from "@chakra-ui/react";

const FooterApp = () => {
  return (
    <Flex height="30px" justifyContent="center" alignItems="center">
      <Text
        sx={{
          fontWeight: "400",
          color: "primary.200",
          fontSize: "sm",
        }}
      >
        Creado con &lt;3 por{" "}
        <Link
          sx={{
            fontWeight: "500",
            textDecoration: "underline",
            _hover: {
              color: "secondary.500",
            },
            _active: {
              color: "secondary.600",
            },
          }}
          href="https://github.com/ondasdejunio"
          isExternal
        >
          ondasdejunio
        </Link>
      </Text>
    </Flex>
  );
};

export default FooterApp;
