import PropTypes from "prop-types";
import { Button, Flex, Heading, IconButton } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";

import useWidth from "../../hooks/useWidth";
import useAuth from "../../hooks/useAuth";

const PostsHeader = (props) => {
  const {
    title,
    canCreatePost,
    isLoading,
    onClickCreatePost,
    onOpenLoginModal,
  } = props;
  const { isBaseWidth } = useWidth();
  const { isAuthenticated } = useAuth();

  return (
    <Flex
      minHeight="45px"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading as="h1" size={{ base: "lg", lg: "lg" }} color="secondary.200">
        {title}
      </Heading>
      {canCreatePost ? (
        isBaseWidth ? (
          <IconButton
            margin="0px"
            aria-label="Nuevo post"
            variant="tertiary"
            size="lg"
            disabled={isLoading}
            icon={<GrAdd size={20} />}
            onClick={() =>
              isAuthenticated ? onClickCreatePost() : onOpenLoginModal()
            }
          />
        ) : (
          <Button
            sx={{
              margin: "0px",
              width: "fit-content",
              paddingX: "10px",
            }}
            leftIcon={<GrAdd size={18} />}
            variant="tertiary"
            aria-label="Nuevo post"
            disabled={isLoading}
            size="md"
            onClick={() =>
              isAuthenticated ? onClickCreatePost() : onOpenLoginModal()
            }
          >
            Nuevo post
          </Button>
        )
      ) : null}
    </Flex>
  );
};

PostsHeader.propTypes = {
  title: PropTypes.string,
  canCreatePost: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClickCreatePost: PropTypes.func,
  onOpenLoginModal: PropTypes.func,
};

PostsHeader.defaultProps = {
  title: undefined,
  canCreatePost: false,
  isLoading: false,
  onClickCreatePost: undefined,
  onOpenLoginModal: undefined,
};

export default PostsHeader;
