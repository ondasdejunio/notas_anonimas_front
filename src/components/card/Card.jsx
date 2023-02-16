import { useState } from "react";
import { Box, Flex, Text, IconButton, Divider, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

import { getStringTimeFromNow } from "../../utils/date";
import { getUserAgeFromNow, getUserGenderLetter } from "../../utils/user";
import { likePost } from "../../services/post";
import useAuth from "../../hooks/useAuth";
import MemoizedCardComment from "./CardComment";
import useLoginModal from "../../hooks/useLoginModal";
import { createPostComment } from "../../services/postComment";
import AutoResizeTextArea from "../AutoResizeTextArea";

const Card = (props) => {
  const {
    data: {
      post: {
        id = null,
        title = null,
        createdAt = null,
        description = null,
        user = {},
        likedByUser = 0,
        likes = 0,
      } = {},
      comments = [],
    } = {},
    onUpdateLike,
  } = props;

  const [likedByUserState, setLikedByUserState] = useState(likedByUser);
  const [postLikes, setPostLikes] = useState(likes);
  const [postComments, setPostComments] = useState(comments);
  const { isAuthenticated } = useAuth();
  const { setOpenLoginModal } = useLoginModal();

  const [textAreaValue, setTextAreaValue] = useState("");

  const handleLike = () => {
    likePost(id)
      .then((r) => {
        setLikedByUserState(!likedByUserState);
        setPostLikes((n) => (!likedByUserState ? n + 1 : n - 1));
        onUpdateLike(!likedByUser ? likes + 1 : likes - 1, !likedByUser);
      })
      .catch((e) => console.error(e));
  };

  const handleComment = () => {
    const postComment = { description: textAreaValue };
    createPostComment(id, postComment)
      .then((r) => {
        setPostComments((arr) => [...arr, r.data.comment]);
        setTextAreaValue("");
      })
      .catch((e) => console.error(e));
  };

  const genderColors = {
    MASCULINO: {
      headerBgColor: "linear(blue.50 0%, blue.200 90%)",
      contentBgColor: "blue.50",
      commentBgColor: "#F7FDFF",
      color: "blue.800",
    },

    FEMENINO: {
      headerBgColor: "linear(pink.50 0%, pink.200 90%)",
      contentBgColor: "pink.50",
      commentBgColor: "#FFFCFD",
      color: "pink.800",
    },
    OTRO: {
      headerBgColor: "linear(secondary.300 0%, secondary.500 90%)",
      contentBgColor: "secondary.100",
      commentBgColor: "secondary.50",
      color: "secondary.800",
    },
  };

  const getFontSize = () => {
    const length = description.length;
    if (length <= 150) {
      return { base: "18px", md: "20px", lg: "24px" };
    } else if (length <= 300) {
      return { base: "16px", md: "16px", lg: "18px" };
    } else {
      return { base: "14px", md: "16px", lg: "17px" };
    }
  };

  return (
    <Box
      height="fit-content"
      maxHeight="70vh"
      width="100%"
      bg={genderColors[user.gender]?.contentBgColor}
      border="1px solid #dedaaf"
      borderRadius="5px"
      overflow="hidden"
      boxShadow="xl"
    >
      <Flex width="100%" maxHeight="35vh" direction="column" key={id}>
        <Flex
          width="100%"
          padding={{ base: "5px", md: "10px", lg: "15px" }}
          bgGradient={genderColors[user.gender]?.headerBgColor}
          borderBottom="1px solid #dedaaf"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap="0px"
        >
          <Flex minWidth="min-content" width="100%" flexDir="row" gap="5px">
            <Text
              fontSize={{ base: "16px", sm: "18px", lg: "22px" }}
              fontWeight="500"
              sx={{
                width: "80%",
                lineHeight: "1.2",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: genderColors[user.gender]?.color,
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
            fontSize={{ base: "12px", md: "13px", lg: "15px" }}
            fontWeight="400"
          >
            {`${getUserGenderLetter(user.gender)}${getUserAgeFromNow(
              user.dateBirth
            )}, ${getStringTimeFromNow(createdAt)}`}
          </Text>
        </Flex>
        <Flex padding="20px 15px" flexDir="column">
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
          padding="8px 15px"
          flexDir="row"
          justifySelf="flex-end"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="15px" fontWeight="500">
            {postLikes} {postLikes === 1 ? "like" : "likes"}
          </Text>
          <IconButton
            variant="cardButton"
            size="sm"
            aria-label="Like"
            icon={likedByUserState ? <FcLike /> : <FcLikePlaceholder />}
            onClick={() =>
              isAuthenticated ? handleLike() : setOpenLoginModal(true)
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
        bg={genderColors[user.gender]?.commentBgColor}
        direction="column"
      >
        {postComments.map((d, i) => (
          <MemoizedCardComment key={i} data={d} />
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
          placeholder="¿En qué piensas?"
          maxLength={350}
        />
        <Button
          variant="transparent"
          onClick={handleComment}
          disabled={!textAreaValue}
        >
          Responder
        </Button>
      </Flex>
    </Box>
  );
};

Card.propTypes = {
  data: PropTypes.object,
  onUpdateLike: PropTypes.func,
};

Card.defaultProps = {
  data: {},
  onUpdateLike: undefined,
};

export default Card;
