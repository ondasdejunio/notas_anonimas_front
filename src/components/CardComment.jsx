import {
  Box,
  Divider,
  Flex,
  HStack,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { AiFillDelete } from "react-icons/ai";

import { getStringTimeFromNow } from "../utils/date";
import { getUserAgeFromNow, getUserGenderLetter } from "../utils/user";
import useAuth from "../hooks/useAuth";
import useLoginModal from "../hooks/useLoginModal";
import { useState } from "react";
import { deletePostComment, likePostComment } from "../services/postComment";
import PopoverDeletePost from "./PopoverDeletePost";
import useToast from "../hooks/useToast";

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
  } = props;
  const { isAuthenticated, userDetails } = useAuth();
  const { successToast, errorToast } = useToast();
  const { setOpenLoginModal } = useLoginModal();
  const [isLoadingPostCommentLike, setIsLoadingPostCommentLike] =
    useState(false);
  const [isLoadingDeletePostComment, setIsLoadingDeletePostComment] =
    useState(false);

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
      <Box padding="5px 10px">
        <HStack paddingBottom="2px" alignItems="flex-start" spacing="5px">
          <Text lineHeight="1.3" fontWeight="500">
            {user.username}:
          </Text>
          <Text
            lineHeight="1.3"
            sx={{
              overflowWrap: "break-word",
              wordWrap: "break-word",
              wordBreak: "break-all",
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
            {userDetails.username === user.username && (
              <PopoverDeletePost
                handleClickButton={onClickPostCommentDelete}
                isLoading={isLoadingDeletePostComment}
                title="Eliminar comentario"
                message="Se eliminará el comentario, ¿estás seguro?"
              >
                <IconButton
                  sx={{ color: "gray.500" }}
                  variant="cardButton"
                  size="xs"
                  aria-label="Like"
                  icon={
                    isLoadingDeletePostComment ? (
                      <Spinner size="sm" />
                    ) : (
                      <AiFillDelete size={18} />
                    )
                  }
                  onClick={(e) => e.stopPropagation()}
                />
              </PopoverDeletePost>
            )}
          </HStack>
          <HStack>
            <IconButton
              variant="cardButton"
              size="xs"
              aria-label="Like"
              disabled={isLoadingPostCommentLike}
              icon={
                isLoadingPostCommentLike ? (
                  <Spinner size="xs" />
                ) : likedByUser ? (
                  <FcLike fontSize="20px" />
                ) : (
                  <FcLikePlaceholder fontSize="20px" />
                )
              }
              onClick={() =>
                isAuthenticated
                  ? onClickLikePostComment()
                  : setOpenLoginModal(true)
              }
            />
            <Text lineHeight="1" width="40px" fontSize="13px" fontWeight="500">
              {likes} {likes === 1 ? "like" : "likes"}
            </Text>
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
};

CardComment.defaultProps = {
  data: {},
  handleCommentLike: undefined,
  handlePostCommentDelete: undefined,
};

export default CardComment;
