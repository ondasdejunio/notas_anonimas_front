import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Flex } from "@chakra-ui/react";

import PostsHeader from "../components/posts/PostsHeader";
import PostsContent from "../components/posts/PostsContent";
import CardModal from "../components/card/CardModal";
import NewCardModal from "../components/card/NewCardModal";
import { getPostComments } from "../services/postComment";
import useAuth from "../hooks/useAuth";
import { getPosts, getPostsByUser } from "../services/post";
import CardMinimal from "../components/card/CardMinimal";
import useLoading from "../hooks/useLoading";
import LoginModal from "../components/LoginModal";

const PostsPage = (props) => {
  const { params, title, getRowPostsByUser, canCreatePost } = props;
  const { isAuthenticated } = useAuth();
  const { isLoading, setIsLoading } = useLoading();
  const [data, setData] = useState({ page: 0, rows: [] });
  const [firstHalf, setFirstHalf] = useState([]);
  const [secondHalf, setSecondHalf] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [openCardModal, setOpenCardModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openNewCardModal, setOpenNewCardModal] = useState(false);

  useEffect(() => {
    if (!getRowPostsByUser) {
      getPostRows({ ...params, page: data.page });
    } else {
      getPostRowsByUser({ ...params, page: data.page });
    }
  }, [data.page, params]);

  useEffect(() => {
    if (data.rows.length > 3) {
      if (data.page === 0) {
        setFirstHalf(data.rows.slice(0, data.rows.length / 2));
        setSecondHalf(data.rows.slice(data.rows.length / 2));
      } else {
        const startIndex = data.page * params.size;
        const endIndex = startIndex + params.size;
        setFirstHalf([
          ...firstHalf,
          ...data.rows.slice(startIndex, startIndex + params.size / 2),
        ]);
        setSecondHalf([
          ...secondHalf,
          ...data.rows.slice(startIndex + params.size / 2, endIndex),
        ]);
      }
    }
  }, [data.rows]);

  const getPostRows = (params) => {
    setIsLoadingState(true, params.page);
    getPosts(params)
      .then((res) => {
        setData(({ page, rows }) =>
          page === 0
            ? { page, rows: res.data }
            : { page, rows: [...rows, ...res.data] }
        );
        setIsLoadingState(false, params.page);
        setHasMoreData(res.data.length === params.size);
      })
      .catch((e) => {
        console.error("Error", e);
        setIsLoadingState(false, params.page);
      });
  };

  const getPostRowsByUser = (params) => {
    setIsLoadingState(true, params.page);
    getPostsByUser(params)
      .then((res) => {
        setData(({ page, rows }) =>
          page === 0
            ? { page, rows: res.data }
            : { page, rows: [...rows, ...res.data] }
        );
        setIsLoadingState(false, params.page);
        setHasMoreData(res.data.length === params.size);
      })
      .catch((e) => {
        console.error("Error", e);
        setIsLoadingState(false, params.page);
      });
  };

  const setIsLoadingState = (b, page) =>
    page === 0 ? setIsLoadingInitialData(b) : setIsLoading(b);

  const handlePostLike = (id, likedByUser) => {
    setData(({ page, rows }) => {
      const item = rows.find((c) => c.id === id);
      item.likes = !likedByUser ? item.likes + 1 : item.likes - 1;
      item.likedByUser = !likedByUser;
      return { page, rows: [...rows] };
    });
  };

  const handlePostDelete = (id) => {
    setData(({ page, rows }) => ({
      page,
      rows: rows.filter((c) => c.id !== id),
    }));
  };

  const handlePostComment = (id) => {
    setData(({ page, rows }) => {
      const item = rows.find((c) => c.id === id);
      item.comments += 1;
      return { page, rows: [...rows] };
    });
  };

  const handlePostCommentDelete = (id) => {
    setData(({ page, rows }) => {
      const item = rows.find((c) => c.id === id);
      item.comments -= 1;
      return { page, rows: [...rows] };
    });
  };

  const onClickCard = (id) => {
    setIsLoading(true);
    getPostComments(id).then((r) => {
      setSelectedCard({
        post: data.rows.find((d) => d.id === id),
        comments: r.data,
      });
      setIsLoading(false);
      setOpenCardModal(true);
    });
  };

  const onClickLoadButton = () => {
    setData(({ page, rows }) => ({ page: page + 1, rows }));
  };

  const onClickCreatePost = () => {
    setOpenNewCardModal(true);
  };

  const onOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const getCardMinimalProps = (d) => ({
    data: d,
    onClick: () => onClickCard(d.id),
    handlePostLike,
    handlePostDelete,
    onOpenLoginModal,
  });

  return (
    <>
      <PostsHeader
        title={title}
        isLoading={isLoadingInitialData || isLoading}
        canCreatePost={canCreatePost}
        onClickCreatePost={onClickCreatePost}
        onOpenLoginModal={onOpenLoginModal}
      />
      <PostsContent
        isLoading={isLoadingInitialData}
        hasMoreData={hasMoreData}
        onClickLoadButton={onClickLoadButton}
      >
        {data.rows.length > 3 ? (
          <>
            <Flex width="100%" direction="column" gap="20px">
              {firstHalf.map((d, i) => (
                <CardMinimal key={i} {...getCardMinimalProps(d)} />
              ))}
            </Flex>
            <Flex width="100%" direction="column" gap="20px">
              {secondHalf.map((d, i) => (
                <CardMinimal key={i} {...getCardMinimalProps(d)} />
              ))}
            </Flex>
          </>
        ) : (
          <Flex
            width="100%"
            direction="column"
            gap="20px"
            justifyContent="center"
          >
            {data.rows.map((d, i) => (
              <CardMinimal key={i} {...getCardMinimalProps(d)} />
            ))}
          </Flex>
        )}
      </PostsContent>
      <CardModal
        data={selectedCard}
        openModal={openCardModal}
        onCloseModal={() => {
          setOpenCardModal(false);
          setSelectedCard({});
        }}
        onOpenLoginModal={onOpenLoginModal}
        handlePostLike={handlePostLike}
        handlePostDelete={handlePostDelete}
        handlePostComment={handlePostComment}
        handlePostCommentDelete={handlePostCommentDelete}
      />
      {isAuthenticated && (
        <NewCardModal
          onCreatedPost={(post) => {
            setOpenNewCardModal(false);
            setData(({ page, rows }) => ({ page, rows: [post, ...rows] }));
            setFirstHalf((arr) => [post, ...arr]);
          }}
          openModal={openNewCardModal}
          onCloseModal={() => setOpenNewCardModal(false)}
        />
      )}
      <LoginModal
        openModal={openLoginModal}
        onCloseModal={() => setOpenLoginModal(false)}
      />
    </>
  );
};

PostsPage.propTypes = {
  params: PropTypes.object,
  title: PropTypes.string,
  getRowPostsByUser: PropTypes.bool,
  canCreatePost: PropTypes.bool,
};

PostsPage.defaultProps = {
  params: {},
  title: undefined,
  getRowPostsByUser: false,
  canCreatePost: false,
};

export default PostsPage;
