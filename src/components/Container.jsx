import PropTypes from "prop-types";
import { Box, Spinner } from "@chakra-ui/react";

const Container = (props) => {
  const { isLoading } = props;
  return (
    <Box sx={{ position: "relative" }}>
      <Box>{props.children}</Box>
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            display: "block",
            width: "100%",
            height: "100%",
          }}
        >
          <Spinner />
        </Box>
      )}
    </Box>
  );
};

Container.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
};

Container.defaultProps = {
  isLoading: false,
  children: undefined,
};

export default Container;
