import { createContext, useState } from "react";
import PropTypes from "prop-types";

import { getPosts, getPostsByUser } from "../services/post";
import useLoading from "../hooks/useLoading";

const DataContext = createContext();

const DataContextProvider = (props) => {
  const { children } = props;
  const [data, setData] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(false);
  const { isLoading, setIsLoading } = useLoading();
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(false);

  const setIsLoadingState = (page) => {
    if (page > 0) {
      setIsLoading((b) => !b);
    } else {
      setIsLoadingInitialData((b) => !b);
    }
  };

  const getPostRows = (params) => {
    setIsLoadingState(params.page);
    getPosts(params)
      .then((res) => {
        setData((prevData) => [...prevData, ...res.data]);
        setIsLoadingState(params.page);
        setHasMoreData(res.data.length === params.size);
      })
      .catch((e) => {
        console.error("Error", e);
        setIsLoadingState(params.page);
      });
  };

  const getPostRowsByUser = (params) => {
    setIsLoadingState(params.page);
    getPostsByUser(params)
      .then((res) => {
        setData((prevData) => [...prevData, ...res.data]);
        setIsLoadingState(params.page);
        setHasMoreData(res.data.length === params.size);
      })
      .catch((e) => {
        console.error("Error", e);
        setIsLoadingState(params.page);
      });
  };

  const handlePostLike = (id, likedByUser) => {
    setData((arr) => {
      const item = arr.find((c) => c.id === id);
      item.likes = !likedByUser ? item.likes + 1 : item.likes - 1;
      item.likedByUser = !likedByUser;
      return [...arr];
    });
  };

  const handlePostDelete = (id) => {
    setData((arr) => arr.filter((c) => c.id !== id));
  };

  const handlePostComment = (id) => {
    setData((arr) => {
      const item = arr.find((c) => c.id === id);
      item.comments += 1;
      return [...arr];
    });
  };

  return (
    <DataContext.Provider
      value={{
        setData,
        data,
        getPostRows,
        getPostRowsByUser,
        handlePostLike,
        handlePostDelete,
        handlePostComment,
        isLoading,
        isLoadingInitialData,
        setIsLoading,
        hasMoreData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataContextProvider.propTypes = {
  children: PropTypes.any,
};

DataContextProvider.defaultProps = {
  children: undefined,
};

export { DataContext, DataContextProvider };
