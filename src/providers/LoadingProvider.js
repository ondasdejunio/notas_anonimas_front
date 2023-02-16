import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text, Progress } from "@chakra-ui/react";

const LoadingContext = createContext();

const LoadingContextProvider = (props) => {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
        {children}
        {isLoading && (
          <Flex
            gap="10px"
            sx={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "2px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          >
            <Text
              sx={{
                fontWeight: "400",
                color: "primary.50",
                fontSize: { base: "lg", md: "md" },
              }}
            >
              Cargando...
            </Text>
            <Progress
              width="200px"
              colorScheme="orange"
              size="md"
              isIndeterminate
            />
          </Flex>
        )}
      </Box>
    </LoadingContext.Provider>
  );
};

LoadingContextProvider.propTypes = {
  children: PropTypes.any,
};

LoadingContextProvider.defaultProps = {
  children: undefined,
};

export { LoadingContext, LoadingContextProvider };
