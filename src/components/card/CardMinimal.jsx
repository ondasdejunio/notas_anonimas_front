import {
  Box,
  Flex,
  Text,
  IconButton,
  HStack,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { AiOutlineHeart, AiFillDelete } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

import { getStringTimeFromNow } from "../../utils/date";
import {
  getUserAgeFromNow,
  getUserGenderLetter,
  userGenderColors,
} from "../../utils/user";
import useAuth from "../../hooks/useAuth";
import useLoginModal from "../../hooks/useLoginModal";
import useData from "../../hooks/useData";
import { useState } from "react";
import { deletePost, likePost } from "../../services/post";
import PopoverDeletePost from "../PopoverDeletePost";
import useToast from "../../hooks/useToast";

const CardMinimal = (props) => {
  const { data = {} } = props;

  const { handlePostLike, handlePostDelete } = useData();

  const {
    id = null,
    title = "",
    createdAt = null,
    description = "",
    user: { username: userPost, gender = "", dateBirth = null } = {},
    likedByUser = false,
    likes = 0,
    comments = 0,
  } = data;
  const { isAuthenticated, userDetails } = useAuth();
  const { setOpenLoginModal } = useLoginModal();
  const [isLoadingPostLike, setIsLoadingPostLike] = useState(false);
  const [isLoadingDeletePost, setIsLoadingDeletePost] = useState(false);
  const { successToast, errorToast } = useToast();

  const {
    headerBgColor = "",
    contentBgColor = "",
    color = "",
  } = userGenderColors[gender] || {};

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
        setIsLoadingDeletePost(false);
        successToast("Post eliminado exitosamente");
      })
      .catch((e) => {
        setIsLoadingDeletePost(false);
        console.error(e);
        errorToast("Hubo un problema eliminando tu post");
      });
  };

  const getFontSize = () => {
    const length = description.length;
    if (length <= 150) {
      return { base: "24px", md: "20px", lg: "24px" };
    } else if (length <= 300) {
      return { base: "20px", md: "16px", lg: "18px" };
    } else {
      return { base: "18px", md: "16px", lg: "17px" };
    }
  };

  return (
    <Box
      width="100%"
      bg={contentBgColor}
      border="1px solid #dedaaf"
      borderRadius="5px"
      overflow="hidden"
      height="fit-content"
      boxShadow="xl"
      _active={{
        transform: "scale(0.95)",
      }}
    >
      <Flex width="100%" direction="column" key={id}>
        <Flex
          width="100%"
          padding={{ base: "10px 15px", md: "5px 10px" }}
          bgGradient={headerBgColor}
          borderBottom="1px solid #dedaaf"
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ base: "flex-start", md: "center" }}
          gap="2px"
        >
          <Flex minWidth="min-content" width="100%" flexDir="row" gap="5px">
            <Text
              fontSize={{ base: "20px", sm: "16px", lg: "18px" }}
              fontWeight="500"
              sx={{
                width: { base: "100%", md: "80%" },
                lineHeight: "1.2",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color,
                wordBreak: "break-all",
              }}
            >
              {title}
            </Text>
          </Flex>
          <Text
            sx={{
              minWidth: "max-content",
              whiteSpace: "nowrap",
              wordBreak: "keep-all",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "1.2",
            }}
            fontSize={{ base: "15px", md: "12px", lg: "13px" }}
            fontWeight="400"
          >
            {`${getUserGenderLetter(gender)}${getUserAgeFromNow(
              dateBirth
            )}, ${getStringTimeFromNow(createdAt)}`}
          </Text>
          {userDetails.username === userPost && (
            <PopoverDeletePost
              handleClickButton={onClickPostDelete}
              isLoading={isLoadingDeletePost}
              title="Eliminar post"
              message="Se eliminará el post, ¿estás seguro?"
            >
              <IconButton
                sx={{ color }}
                variant="cardButton"
                size="xs"
                aria-label="Like"
                icon={<AiFillDelete size={20} />}
                onClick={(e) => e.stopPropagation()}
              />
            </PopoverDeletePost>
          )}
        </Flex>
        <Flex
          padding={{ base: "10px 15px 20px 15px", md: "5px 10px" }}
          flexDir="column"
        >
          <Text
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              hyphens: "auto",
              lineHeight: "1.3",
            }}
            fontSize={getFontSize()}
          >
            {description}
          </Text>
        </Flex>
        <Flex
          padding={{ base: "10px 12px", md: "8px 10px" }}
          flexDir="row"
          justifySelf="flex-end"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <HStack
            fontSize={{ base: "18px", md: "14px" }}
            fontWeight="500"
            spacing="15px"
            color={color}
          >
            <HStack alignItems="center" minWidth="30px" spacing="5px">
              <Icon
                as={AiOutlineHeart}
                boxSize={{ base: "22px", md: "16px" }}
              />
              <Text>{likes}</Text>
            </HStack>
            <HStack alignItems="center" minWidth="30px" spacing="5px">
              <Icon as={FaRegComment} boxSize={{ base: "19px", md: "14px" }} />
              <Text>{comments}</Text>
            </HStack>
          </HStack>
          <IconButton
            variant="cardButton"
            size="sm"
            aria-label="Like"
            disabled={isLoadingPostLike}
            icon={
              isLoadingPostLike ? (
                <Spinner size={{ base: "md", md: "sm" }} />
              ) : likedByUser ? (
                <Icon as={FcLike} boxSize={{ base: "32px", md: "25px" }} />
              ) : (
                <Icon
                  as={FcLikePlaceholder}
                  boxSize={{ base: "32px", md: "25px" }}
                />
              )
            }
            onClick={(e) => {
              e.stopPropagation();
              if (isAuthenticated) {
                return onClickPostLike();
              }
              return setOpenLoginModal(true);
            }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

CardMinimal.propTypes = {
  data: PropTypes.object,
};

CardMinimal.defaultProps = {
  data: {},
};

export default CardMinimal;
