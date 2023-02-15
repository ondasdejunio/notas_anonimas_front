import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const LoadingWrapper = (props) => {
  const { isLoading, children, darkenBackground } = props;

  return (
    <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          ...(isLoading
            ? {
                WebkitFilter: "blur(1px)",
                filter: "blur(1px)",
                transition: "all 0.1s",
              }
            : {}),
        }}
      >
        {children}
      </Box>
      {isLoading && (
        <Flex
          gap="10px"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "5px",
            backgroundColor: darkenBackground
              ? "rgba(0, 0, 0, 0.5)"
              : undefined,
          }}
        >
          <Text sx={{ fontWeight: "400", color: "primary.50", fontSize: "md" }}>
            Cargando...
          </Text>
          <Progress
            width={{ base: "120px", md: "150px", lg: "160px" }}
            colorScheme="orange"
            size="md"
            isIndeterminate
          />
        </Flex>
      )}
    </Box>
  );
};

LoadingWrapper.propTypes = {
  isLoading: PropTypes.bool,
  darkenBackground: PropTypes.bool,
  children: PropTypes.any,
};

LoadingWrapper.defaultProps = {
  isLoading: false,
  darkenBackground: false,
  children: undefined,
};

export default LoadingWrapper;
