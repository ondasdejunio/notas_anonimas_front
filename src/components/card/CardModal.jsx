import { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Divider,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  Spinner,
  Icon,
  HStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { AiFillDelete, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

import { getStringTimeFromNow } from "../../utils/date";
import {
  getUserAgeFromNow,
  getUserGenderLetter,
  userGenderColors,
  getCardDescriptionFontSize,
} from "../../utils/user";
import useAuth from "../../hooks/useAuth";
import MemoizedCardComment from "./CardComment";
import { createPostComment } from "../../services/postComment";
import AutoResizeTextArea from "../common/AutoResizeTextArea";
import { likePost, deletePost } from "../../services/post";
import useToast from "../../hooks/useToast";
import DeletePopover from "../common/DeletePopover";
import useWidth from "../../hooks/useWidth";

const CardModal = (props) => {
  const {
    data: post,
    openModal,
    onCloseModal,
    handlePostLike,
    handlePostComment,
    handlePostDelete,
    handlePostCommentDelete,
    onOpenLoginModal,
  } = props;
  const { isBaseWidth } = useWidth();
  const { isAuthenticated, userDetails } = useAuth();
  const [textAreaValue, setTextAreaValue] = useState("");
  const [data, setData] = useState(post);
  const [isLoadingPostComment, setIsLoadingPostComment] = useState(false);
  const [isLoadingPostLike, setIsLoadingPostLike] = useState(false);
  const commentsContainerRef = useRef(null);
  const [newCommentsCount, setNewCommentsCount] = useState(0);
  const { successToast, errorToast } = useToast();
  const [isLoadingDeletePost, setIsLoadingDeletePost] = useState(false);

  useEffect(() => {
    setData(post);
  }, [post]);

  const {
    post: {
      id = null,
      description = "",
      createdAt = null,
      title,
      likes = 0,
      comments: commentsNumber = 0,
      likedByUser = false,
      user: { username: userPost, gender = "", dateBirth = null } = {},
    } = {},
    comments = [],
  } = data;

  const {
    headerBgColor = "",
    contentBgColor = "",
    color = "",
    commentBgColor = "",
  } = userGenderColors[gender] || {};

  const scrollToNewComment = () => {
    commentsContainerRef.current.scrollTo({
      top: commentsContainerRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (newCommentsCount >= 1) {
      scrollToNewComment();
    }
  }, [newCommentsCount]);

  const handleComment = () => {
    const postComment = { description: textAreaValue };
    setIsLoadingPostComment(true);
    createPostComment(id, postComment)
      .then((r) => {
        setIsLoadingPostComment(false);
        handlePostComment(id, postComment);
        setData((obj) => ({
          ...obj,
          comments: [...obj.comments, r.data.comment],
        }));
        setNewCommentsCount((n) => n + 1);
        setTextAreaValue("");
      })
      .catch((e) => {
        setIsLoadingPostComment(false);
        errorToast("Hubo un problema creando tu comentario.");
        console.error(e);
      });
  };

  const onClickPostLike = () => {
    setIsLoadingPostLike(true);
    likePost(id)
      .then((r) => {
        handlePostLike(id, likedByUser);
        setIsLoadingPostLike(false);
      })
      .catch((e) => {
        setIsLoadingPostLike(false);
        console.error(e);
      });
  };

  const onClickPostDelete = () => {
    setIsLoadingDeletePost(true);
    deletePost(id)
      .then((r) => {
        handlePostDelete(id);
        onCloseModal();
        setIsLoadingDeletePost(false);
        successToast("Post eliminado exitosamente");
      })
      .catch((e) => {
        setIsLoadingDeletePost(false);
        console.error(e);
        errorToast("Hubo un problema eliminando tu post");
      });
  };

  const handlePostCommentLike = (commentId) => {
    setData((obj) => {
      const comment = obj.comments.find((c) => c.id === commentId);
      comment.likedByUser = !comment.likedByUser;
      comment.likes = !comment.likedByUser
        ? comment.likes - 1
        : comment.likes + 1;
      return { ...obj };
    });
  };

  const handlePostCommentDeleteCard = (commentId) => {
    setData((obj) => {
      const comments = obj.comments.filter((c) => c.id !== commentId);
      obj.comments = comments;
      return { ...obj };
    });
    handlePostCommentDelete(id);
  };

  return (
    <Modal
      isOpen={openModal}
      onClose={() => {
        onCloseModal();
        setTextAreaValue("");
      }}
      variant="card"
      closeOnOverlayClick={!isLoadingPostComment}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton
          disabled={isLoadingPostComment}
          sx={{ borderRadius: "0px", color: "primary.50", fontSize: "15px" }}
        />
        <ModalBody>
          {Object.keys(data).length !== 0 ? (
            <Box
              height="fit-content"
              maxHeight="80vh"
              width="100%"
              bg={contentBgColor}
              border="1px solid #dedaaf"
              borderRadius="5px"
              overflow="hidden"
              boxShadow="xl"
            >
              <Flex width="100%" maxHeight="45vh" direction="column" key={id}>
                <Flex
                  width="100%"
                  padding={{ base: "15px 10px", md: "10px", lg: "15px" }}
                  bgGradient={headerBgColor}
                  borderBottom="1px solid #dedaaf"
                  direction={{ base: "column", md: "row" }}
                  justifyContent="space-between"
                  alignItems={{ base: "flex-start", md: "center" }}
                  gap="5px"
                >
                  <Flex
                    minWidth="min-content"
                    width="100%"
                    flexDir="column"
                    gap="5px"
                  >
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      gap="5px"
                    >
                      <Text
                        fontSize={{ base: "22px", sm: "18px", lg: "22px" }}
                        fontWeight="500"
                        sx={{
                          width: { base: "100%", md: "80%" },
                          lineHeight: "1.2",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          overflowWrap: "break-all",
                          wordWrap: "break-word",
                          color,
                        }}
                      >
                        {title}
                      </Text>
                      {isBaseWidth && userDetails.username === userPost && (
                        <DeletePopover
                          handleClickButton={onClickPostDelete}
                          isLoading={isLoadingDeletePost}
                          title="Eliminar post"
                          message="Se eliminar?? el post, ??est??s seguro?"
                        >
                          <IconButton
                            sx={{ color }}
                            variant="cardButton"
                            size="sm"
                            aria-label="Eliminar"
                            icon={
                              isLoadingDeletePost ? (
                                <Spinner size={{ base: "md", md: "sm" }} />
                              ) : (
                                <Icon
                                  as={AiFillDelete}
                                  boxSize={{ base: "32px", md: "25px" }}
                                />
                              )
                            }
                          />
                        </DeletePopover>
                      )}
                    </Flex>
                    {!isBaseWidth && (
                      <Text
                        sx={{
                          minWidth: "max-content",
                          whiteSpace: "nowrap",
                          wordBreak: "keep-all",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          lineHeight: "1.2",
                          color,
                        }}
                        fontSize={{ base: "12px", md: "13px", lg: "15px" }}
                        fontWeight="400"
                      >
                        <b>~ </b>
                        {userPost}
                      </Text>
                    )}
                  </Flex>
                  <Text
                    sx={{
                      minWidth: "max-content",
                      whiteSpace: "nowrap",
                      wordBreak: "keep-all",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      lineHeight: "1.2",
                      color,
                    }}
                    fontSize={{ base: "15px", md: "13px", lg: "15px" }}
                    fontWeight="400"
                  >
                    {isBaseWidth ? (
                      <>
                        <b>~ </b>
                        {`${userPost}, ${getUserGenderLetter(
                          gender
                        )}${getUserAgeFromNow(
                          dateBirth
                        )}, ${getStringTimeFromNow(createdAt)}`}
                      </>
                    ) : (
                      <>
                        {`${getUserGenderLetter(gender)}${getUserAgeFromNow(
                          dateBirth
                        )}, ${getStringTimeFromNow(createdAt)}`}
                      </>
                    )}
                  </Text>
                  {!isBaseWidth && userDetails.username === userPost && (
                    <DeletePopover
                      handleClickButton={onClickPostDelete}
                      isLoading={isLoadingDeletePost}
                      title="Eliminar post"
                      message="Se eliminar?? el post, ??est??s seguro?"
                    >
                      <IconButton
                        sx={{ color }}
                        variant="cardButton"
                        size="sm"
                        aria-label="Eliminar"
                        icon={
                          isLoadingDeletePost ? (
                            <Spinner size={{ base: "md", md: "sm" }} />
                          ) : (
                            <Icon
                              as={AiFillDelete}
                              boxSize={{ base: "32px", md: "25px" }}
                            />
                          )
                        }
                      />
                    </DeletePopover>
                  )}
                </Flex>
                <Flex
                  padding="20px 15px"
                  flexDir="column"
                  minHeight="10vh"
                  height="fit-content"
                  overflowY="auto"
                  paddingBottom="10px"
                >
                  <Text
                    sx={{
                      whiteSpace: "pre-wrap",
                      overflowWrap: "break-all",
                      wordWrap: "break-word",
                      hyphens: "auto",
                      lineHeight: "1.3",
                    }}
                    fontSize={getCardDescriptionFontSize(description)}
                  >
                    {description}
                  </Text>
                </Flex>
                <Flex
                  padding="8px 15px"
                  flexDir="row"
                  justifySelf="flex-end"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {isBaseWidth ? (
                    <HStack spacing="15px">
                      <HStack alignItems="center" minWidth="30px" spacing="5px">
                        <Icon
                          as={AiOutlineHeart}
                          boxSize={{ base: "22px", md: "16px" }}
                        />
                        <Text>{likes}</Text>
                      </HStack>
                      <HStack alignItems="center" minWidth="30px" spacing="5px">
                        <Icon
                          as={FaRegComment}
                          boxSize={{ base: "19px", md: "14px" }}
                        />
                        <Text>{commentsNumber}</Text>
                      </HStack>
                    </HStack>
                  ) : (
                    <Text fontSize="15px" fontWeight="400">
                      {`${likes} ${
                        likes === 1 ? "like" : "likes"
                      }, ${commentsNumber} ${
                        commentsNumber === 1 ? "comentario" : "comentarios"
                      }`}
                    </Text>
                  )}
                  <IconButton
                    variant="cardButton"
                    size="sm"
                    aria-label="Like"
                    disabled={isLoadingPostLike}
                    icon={
                      isLoadingPostLike ? (
                        <Spinner size={{ base: "md", md: "sm" }} />
                      ) : likedByUser ? (
                        <Icon
                          as={FcLike}
                          boxSize={{ base: "32px", md: "25px" }}
                        />
                      ) : (
                        <Icon
                          as={FcLikePlaceholder}
                          boxSize={{ base: "32px", md: "25px" }}
                        />
                      )
                    }
                    onClick={() =>
                      isAuthenticated ? onClickPostLike() : onOpenLoginModal()
                    }
                  />
                </Flex>
              </Flex>

              <Divider orientation="horizontal" />
              <Flex
                sx={{
                  maxHeight: "30vh",
                  overflowY: "auto",
                }}
                bg={commentBgColor}
                direction="column"
                ref={commentsContainerRef}
              >
                {comments.map((d, i) => (
                  <MemoizedCardComment
                    key={i}
                    data={d}
                    handleCommentLike={handlePostCommentLike}
                    handlePostCommentDelete={handlePostCommentDeleteCard}
                  />
                ))}
              </Flex>
              <Divider orientation="horizontal" />
              <Flex
                sx={{
                  bgColor: "white",
                  paddingRight: "5px",
                  minHeight: "40px",
                  maxHeight: "100px",
                }}
                alignItems="center"
              >
                <AutoResizeTextArea
                  sx={{
                    minHeight: "35px",
                    maxHeight: "100px",
                    marginY: "5px",
                    bgColor: "transparent",
                    border: "none",
                    overflowWrap: "break-all",
                    wordWrap: "break-word",
                    whiteSpace: "pre-wrap",
                    hyphens: "auto",
                    "::-webkit-resizer": {
                      display: "none",
                    },
                  }}
                  value={textAreaValue}
                  onChange={(v) => setTextAreaValue(v.target.value)}
                  placeholder="??En qu?? piensas?"
                  maxLength={350}
                />
                <Button
                  fontSize={{ base: "15px", md: "14px" }}
                  minWidth={{ base: "90px", md: "80px" }}
                  variant="transparent"
                  isLoading={isLoadingPostComment}
                  onClick={() =>
                    isAuthenticated ? handleComment() : onOpenLoginModal()
                  }
                  disabled={isLoadingPostComment || !textAreaValue}
                >
                  Responder
                </Button>
              </Flex>
            </Box>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

CardModal.propTypes = {
  data: PropTypes.object,
  dataProp: PropTypes.object,
  openModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
  handlePostLike: PropTypes.func,
  handlePostComment: PropTypes.func,
  handlePostDelete: PropTypes.func,
  handlePostCommentDelete: PropTypes.func,
  onOpenLoginModal: PropTypes.func,
};

CardModal.defaultProps = {
  data: {},
  dataProp: {},
  openModal: false,
  onCloseModal: undefined,
  handlePostLike: undefined,
  handlePostComment: undefined,
  handlePostDelete: undefined,
  handlePostCommentDelete: undefined,
  onOpenLoginModal: undefined,
};

export default CardModal;
