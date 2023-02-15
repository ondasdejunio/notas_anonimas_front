import { NavLink } from "react-router-dom";
import { Flex, Heading, Button, Center, Divider, Box } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

import useWidth from "../../hooks/useWidth";

const HeaderApp = () => {
  const { isMidWith } = useWidth();

  const dividerStyles = {
    height: "100%",
    borderColor: "primary.700",
  };

  const navLinkActiveStyles = {
    bgGradient:
      "linear(primary.800 -20%, primary.600 15%, primary.600 40%, primary.500 90%)",
    color: "yellow.50",
    _hover: {
      bgGradient:
        "linear(primary.800 -20%, primary.600 15%, primary.600 40%, primary.500 90%)",
    },
    _active: {
      bgGradient:
        "linear(primary.800 -20%, primary.600 15%, primary.600 40%, primary.500 90%)",
    },
  };

  return (
    <Flex
      width="100%"
      justifyContent={{ base: "center", md: "space-between" }}
      direction={{ base: "column", md: "row" }}
      alignItems={{ base: "center", md: "end" }}
    >
      <Flex
        direction="row"
        paddingY="10px"
        justifyContent="center"
        alignItems="end"
        gap="5px"
      >
        <Heading
          as="h2"
          color="primary.50"
          fontWeight="500"
          size={{ base: "sm", md: "md" }}
        >
          📝
        </Heading>
        <Heading
          as="h2"
          color="primary.50"
          fontWeight="500"
          size={{ base: "sm", md: "md" }}
        >
          Notas Anónimas
        </Heading>
      </Flex>
      <Flex justifyContent="center" alignItems="end" gap="5px">
        <Flex
          position="relative"
          bg="primary.400"
          color="white"
          height="100%"
          fontWeight="500"
          fontSize="18px"
          borderRadius="10px 10px 0px 0px"
          borderTop="3px solid #162941"
        >
          <NavLink to="/recents">
            {({ isActive }) => (
              <Button
                sx={isActive ? navLinkActiveStyles : null}
                variant="navLink"
              >
                {isMidWith ? "✨" : "Recientes ✨"}
              </Button>
            )}
          </NavLink>
          <Center height="50px">
            <Divider orientation="vertical" sx={dividerStyles} />
          </Center>
          <NavLink to="/hot">
            {({ isActive }) => (
              <Button
                sx={isActive ? navLinkActiveStyles : null}
                variant="navLink"
              >
                {isMidWith ? "🔥" : "Más relevantes 🔥"}
              </Button>
            )}
          </NavLink>
          <Center height="50px">
            <Divider orientation="vertical" sx={dividerStyles} />
          </Center>
          <NavLink to="/old">
            {({ isActive }) => (
              <Button
                sx={isActive ? navLinkActiveStyles : null}
                variant="navLink"
              >
                {isMidWith ? "🕰️" : "Más antiguas 🕰️"}
              </Button>
            )}
          </NavLink>
        </Flex>
        <Box
          position="relative"
          bg="primary.400"
          color="white"
          height="100%"
          justifyContent="center"
          borderRadius="10px 10px 0px 0px"
          borderTop="3px solid #162941"
        >
          <NavLink to="/user">
            {({ isActive }) => (
              <Button
                sx={isActive ? navLinkActiveStyles : null}
                variant="navLink"
              >
                <FaUser />
              </Button>
            )}
          </NavLink>
        </Box>
      </Flex>
    </Flex>
  );
};

export default HeaderApp;
