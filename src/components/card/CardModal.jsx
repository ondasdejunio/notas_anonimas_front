import { useState, useEffect, useRef, memo } from "react";
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
import useLoginModal from "../../hooks/useLoginModal";
import { createPostComment } from "../../services/postComment";
import AutoResizeTextArea from "../AutoResizeTextArea";
import useData from "../../hooks/useData";
import { likePost, deletePost } from "../../services/post";
import useToast from "../../hooks/useToast";
import PopoverDeletePost from "../PopoverDeletePost";
import useWidth from "../../hooks/useWidth";

const CardModal = (props) => {
  const { data: post, openModal, onCloseModal } = props;
  const { handlePostLike, handlePostComment, handlePostDelete } = useData();
  const { isBaseWidth } = useWidth();
  const { isAuthenticated, userDetails } = useAuth();
  const { setOpenLoginModal } = useLoginModal();
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

  const handlePostCommentDelete = (commentId) => {
    setData((obj) => {
      const comments = obj.comments.filter((c) => c.id !== commentId);
      obj.comments = comments;
      return { ...obj };
    });
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
              <Flex width="100%" maxHeight="40vh" direction="column" key={id}>
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
                          wordBreak: "break-all",
                          color,
                        }}
                      >
                        {title}
                      </Text>
                      {isBaseWidth && userDetails.username === userPost && (
                        <PopoverDeletePost
                          handleClickButton={onClickPostDelete}
                          isLoading={isLoadingDeletePost}
                          title="Eliminar post"
                          message="Se eliminará el post, ¿estás seguro?"
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
                        </PopoverDeletePost>
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
                    <PopoverDeletePost
                      handleClickButton={onClickPostDelete}
                      isLoading={isLoadingDeletePost}
                      title="Eliminar post"
                      message="Se eliminará el post, ¿estás seguro?"
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
                    </PopoverDeletePost>
                  )}
                </Flex>
                <Flex
                  padding="20px 15px"
                  flexDir="column"
                  minHeight="10vh"
                  paddingBottom="10px"
                >
                  <Text
                    sx={{
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-all",
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
                      isAuthenticated
                        ? onClickPostLike()
                        : setOpenLoginModal(true)
                    }
                  />
                </Flex>
              </Flex>

              <Divider orientation="horizontal" />
              <Flex
                sx={{
                  maxHeight: "35vh",
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
                    handlePostCommentDelete={handlePostCommentDelete}
                  />
                ))}
              </Flex>
              <Divider orientation="horizontal" />
              <Flex
                sx={{
                  bgColor: "white",
                  paddingRight: "5px",
                  minHeight: "35px",
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
                    overflowWrap: "break-word",
                    wordWrap: "break-word",
                    wordBreak: "break-all",
                    whiteSpace: "pre-wrap",
                    hyphens: "auto",
                    "::-webkit-resizer": {
                      display: "none",
                    },
                  }}
                  value={textAreaValue}
                  onChange={(v) => setTextAreaValue(v.target.value)}
                  placeholder="¿En qué piensas?"
                  maxLength={350}
                />
                <Button
                  fontSize={{ base: "15px", md: "14px" }}
                  minWidth={{ base: "90px", md: "80px" }}
                  variant="transparent"
                  isLoading={isLoadingPostComment}
                  onClick={() =>
                    isAuthenticated ? handleComment() : setOpenLoginModal(true)
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
};

CardModal.defaultProps = {
  data: {},
  dataProp: {},
  openModal: false,
  onCloseModal: undefined,
};

const MemoizedCardModal = memo(CardModal);

export default MemoizedCardModal;
