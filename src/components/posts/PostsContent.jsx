import PropTypes from "prop-types";
import { Grid, Flex, Button, Box } from "@chakra-ui/react";

import LoadingWrapper from "../common/LoadingWrapper";
import NoDataMessage from "../NoDataMessage";

const PostsContent = (props) => {
  const { children, onClickLoadButton, isLoading, hasMoreData } = props;

  return (
    <Box height="95%">
      <LoadingWrapper isLoading={isLoading}>
        <Flex
          width="100%"
          direction="column"
          height="100%"
          justifyContent="space-between"
        >
          <Flex width="100%" marginTop="15px" height="fit-content">
            {!isLoading ? (
              <Grid
                width="100%"
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                templateRows="auto"
                gap="20px"
              >
                {children}
              </Grid>
            ) : (
              !isLoading && <NoDataMessage />
            )}
          </Flex>
          {!isLoading && hasMoreData && (
            <Button
              onClick={onClickLoadButton}
              sx={{
                bg: "transparent",
                color: "primary.100",
                border: "none",
                fontSize: "md",
                _hover: {
                  color: "primary.50",
                },
                _active: {
                  color: "primary.200",
                },
                _disabled: {
                  color: "gray.400 !important",
                },
              }}
              size="md"
            >
              Cargar más...
            </Button>
          )}
        </Flex>
      </LoadingWrapper>
    </Box>
  );
};

PostsContent.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  onClickLoadButton: PropTypes.func,
  isLoading: PropTypes.bool,
  hasMoreData: PropTypes.bool,
};

PostsContent.defaultProps = {
  title: undefined,
  children: {},
  onClickLoadButton: undefined,
  isLoading: false,
  hasMoreData: false,
};

export default PostsContent;
