import { useState } from "react";
import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { AiFillDelete } from "react-icons/ai";

import { getStringTimeFromNow } from "../../utils/date";
import { getUserAgeFromNow, getUserGenderLetter } from "../../utils/user";
import useAuth from "../../hooks/useAuth";
import { deletePostComment, likePostComment } from "../../services/postComment";
import DeletePopover from "../common/DeletePopover";
import useToast from "../../hooks/useToast";
import useWidth from "../../hooks/useWidth";

const CardComment = (props) => {
  const {
    data: {
      id = null,
      createdAt = null,
      description = null,
      user = {},
      likedByUser = 0,
      likes = 0,
    } = {},
    handleCommentLike,
    handlePostCommentDelete,
    onOpenLoginModal,
  } = props;
  const { isAuthenticated, userDetails } = useAuth();
  const { successToast, errorToast } = useToast();
  const [isLoadingPostCommentLike, setIsLoadingPostCommentLike] =
    useState(false);
  const [isLoadingDeletePostComment, setIsLoadingDeletePostComment] =
    useState(false);
  const { isBaseWidth } = useWidth();

  const onClickLikePostComment = () => {
    setIsLoadingPostCommentLike(true);
    likePostComment(id)
      .then((r) => {
        setIsLoadingPostCommentLike(false);
        handleCommentLike(id);
      })
      .catch((e) => {
        console.error(e);
        setIsLoadingPostCommentLike(false);
      });
  };

  const onClickPostCommentDelete = () => {
    setIsLoadingDeletePostComment(true);
    deletePostComment(id)
      .then((r) => {
        handlePostCommentDelete(id);
        setIsLoadingDeletePostComment(false);
        successToast("Comentario eliminado exitosamente");
      })
      .catch((e) => {
        setIsLoadingDeletePostComment(false);
        console.error(e);
        errorToast("Hubo un problema eliminando tu comentario");
      });
  };

  return (
    <>
      <Box padding={{ base: "12px 15px 10px 15px", md: "5px 10px" }}>
        <HStack paddingBottom="2px" alignItems="flex-start" spacing="5px">
          <Text lineHeight="1.3" fontWeight="500">
            {user.username}:
          </Text>
          <Text
            lineHeight="1.3"
            sx={{
              overflowWrap: "break-all",
              wordWrap: "break-word",
              hyphens: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {description}
          </Text>
        </HStack>
        <Flex
          flexDir="row"
          justifySelf="flex-end"
          justifyContent="space-between"
          gap="5px"
          alignItems="center"
        >
          <HStack>
            <Text
              sx={{
                minWidth: "max-content",
                whiteSpace: "nowrap",
                wordBreak: "keep-all",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1.2",
              }}
              fontSize={{ base: "12px", md: "13px", lg: "13px" }}
              fontWeight="400"
            >
              {`${getUserGenderLetter(user.gender)}${getUserAgeFromNow(
                user.dateBirth
              )}, ${getStringTimeFromNow(createdAt)}`}
            </Text>
          </HStack>
          <HStack spacing="3px">
            <Text
              lineHeight="1"
              minWidth={!isBaseWidth ? "30px" : "min-content"}
              fontSize="13px"
              fontWeight="500"
            >
              {likes} {!isBaseWidth ? (likes === 1 ? "like" : "likes") : ""}
            </Text>
            <IconButton
              variant="cardButton"
              size="xs"
              aria-label="Like"
              disabled={isLoadingPostCommentLike}
              icon={
                isLoadingPostCommentLike ? (
                  <Spinner size="sm" />
                ) : likedByUser ? (
                  <Icon as={FcLike} boxSize={{ base: "22px", md: "20px" }} />
                ) : (
                  <Icon
                    as={FcLikePlaceholder}
                    boxSize={{ base: "22px", md: "20px" }}
                  />
                )
              }
              onClick={() =>
                isAuthenticated ? onClickLikePostComment() : onOpenLoginModal()
              }
            />
            {userDetails.username === user.username && (
              <DeletePopover
                handleClickButton={onClickPostCommentDelete}
                isLoading={isLoadingDeletePostComment}
                title="Eliminar comentario"
                message="Se eliminar?? el comentario, ??est??s seguro?"
              >
                <IconButton
                  sx={{ color: "gray.500" }}
                  variant="cardButton"
                  size="xs"
                  aria-label="Eliminar"
                  icon={
                    isLoadingDeletePostComment ? (
                      <Spinner size="sm" />
                    ) : (
                      <Icon
                        as={AiFillDelete}
                        boxSize={{ base: "22px", md: "20px" }}
                      />
                    )
                  }
                  onClick={(e) => e.stopPropagation()}
                />
              </DeletePopover>
            )}
          </HStack>
        </Flex>
      </Box>
      <Divider orientation="horizontal" />
    </>
  );
};

CardComment.propTypes = {
  data: PropTypes.object,
  handleCommentLike: PropTypes.func,
  handlePostCommentDelete: PropTypes.func,
  onOpenLoginModal: PropTypes.func,
};

CardComment.defaultProps = {
  data: {},
  handleCommentLike: undefined,
  handlePostCommentDelete: undefined,
  onOpenLoginModal: undefined,
};

export default CardComment;
