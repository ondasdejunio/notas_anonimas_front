import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Flex, Heading, Button, IconButton, Box } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";

import CardMinimal from "../components/CardMinimal";
import setTabTitle from "../utils/tabTitle";
import useWidth from "../hooks/useWidth";
import useAuth from "../hooks/useAuth";
import useLoginModal from "../hooks/useLoginModal";
import useData from "../hooks/useData";
import CardModal from "../components/CardModal";
import NewCardModal from "../components/NewCardModal";
import { getPostComments } from "../services/postComment";
import LoadingWrapper from "../components/LoadingWrapper";
import NoData from "../components/NoData";

const PostList = (props) => {
  const { title, params, showCreateModal, getPostsByUser } = props;
  const {
    data,
    setData,
    getPostRows,
    getPostRowsByUser,
    hasMoreData,
    setIsLoading,
    isLoadingInitialData,
  } = useData();
  const [firstHalf, setFirstHalf] = useState([]);
  const [secondHalf, setSecondHalf] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedCard, setSelectedCard] = useState({});
  const [openNewCardModal, setOpenNewCardModal] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);

  const { isBaseWidth } = useWidth();
  const { isAuthenticated } = useAuth();
  const { setOpenLoginModal } = useLoginModal();
  const size = params.size;

  useEffect(() => {
    setTabTitle("Más recientes");
  }, []);

  useEffect(() => {
    if (data.length !== firstHalf.length + secondHalf.length) {
      if (data.length > 5) {
        if (page === 0) {
          setFirstHalf(data.slice(0, data.length / 2));
          setSecondHalf(data.slice(data.length / 2));
        } else {
          const startIndex = page * size;
          const endIndex = startIndex + size;
          setFirstHalf((arr) => [
            ...arr,
            ...data.slice(startIndex, startIndex + size / 2),
          ]);
          setSecondHalf((arr) => [
            ...arr,
            ...data.slice(startIndex + size / 2, endIndex),
          ]);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (page === 0) {
      setData([]);
    }
    if (!getPostsByUser) {
      getPostRows({ ...params, page });
    } else {
      getPostRowsByUser({ ...params, page });
    }
  }, [params, page]);

  const getSelectedCardData = (d) => {
    if (d) {
      setIsLoading(true);
      getPostComments(d.id).then((r) => {
        setSelectedCard({ post: d, comments: r.data });
        setIsLoading(false);
        setOpenCardModal(true);
      });
    }
  };

  return (
    <Box height="100%">
      <LoadingWrapper isLoading={isLoadingInitialData}>
        <Flex width="100%" direction="column" gap="10px" height="100%">
          <Flex
            minHeight="40px"
            // marginBottom="10px"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading
              as="h1"
              size={{ base: "md", lg: "lg" }}
              color="secondary.200"
            >
              {title}
            </Heading>
            {showCreateModal ? (
              isBaseWidth ? (
                <IconButton
                  margin="0px"
                  aria-label="Nuevo post"
                  variant="tertiary"
                  size="md"
                  icon={<GrAdd size={18} />}
                  onClick={() =>
                    isAuthenticated
                      ? setOpenNewCardModal(true)
                      : setOpenLoginModal(true)
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
                  size="md"
                  onClick={() =>
                    isAuthenticated
                      ? setOpenNewCardModal(true)
                      : setOpenLoginModal(true)
                  }
                >
                  Nuevo post
                </Button>
              )
            ) : null}
          </Flex>
          <Flex width="100%" marginTop="15px" height="100%">
            {!isLoadingInitialData && data.length > 0 ? (
              data.length > 5 ? (
                <Grid
                  width="100%"
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  templateRows="auto"
                  gap="20px"
                >
                  <Flex width="100%" direction="column" gap="20px">
                    {firstHalf.map((d, i) => (
                      <Box
                        key={i}
                        cursor="pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          getSelectedCardData(d);
                        }}
                      >
                        <CardMinimal data={d} />
                      </Box>
                    ))}
                  </Flex>
                  <Flex width="100%" direction="column" gap="20px">
                    {secondHalf.map((d, i) => (
                      <Box
                        key={i}
                        cursor="pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          getSelectedCardData(d);
                        }}
                      >
                        <CardMinimal data={d} />
                      </Box>
                    ))}
                  </Flex>
                </Grid>
              ) : (
                <Flex width="100%" direction="column" gap="20px">
                  {data.map((d, i) => (
                    <Box
                      key={i}
                      width={{ base: "100%", md: "80%", lg: "60%" }}
                      alignSelf="center"
                      cursor="pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        getSelectedCardData(d);
                      }}
                    >
                      <CardMinimal data={d} />
                    </Box>
                  ))}
                </Flex>
              )
            ) : (
              !isLoadingInitialData && <NoData />
            )}
          </Flex>
          {hasMoreData && (
            <Button
              onClick={() => setPage((n) => n + 1)}
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
      <CardModal
        data={selectedCard}
        openModal={openCardModal}
        onCloseModal={() => {
          setOpenCardModal(false);
          setSelectedCard({});
        }}
      />
      {isAuthenticated && (
        <NewCardModal
          onCreatedPost={(b, post) => {
            if (b) {
              setOpenNewCardModal(false);
              setData((arr) => [post, ...arr]);
              setFirstHalf((arr) => [post, ...arr]);
            }
          }}
          openModal={openNewCardModal}
          onCloseModal={() => setOpenNewCardModal(false)}
        />
      )}
    </Box>
  );
};

PostList.propTypes = {
  title: PropTypes.string,
  params: PropTypes.object,
  showCreateModal: PropTypes.bool,
  getPostsByUser: PropTypes.bool,
};

PostList.defaultProps = {
  title: undefined,
  params: {},
  showCreateModal: false,
  getPostsByUser: false,
};

export default PostList;
