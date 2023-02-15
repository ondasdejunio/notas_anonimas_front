import { axiosInstance } from "../api/axios";

export const getPostComments = (id) => axiosInstance.get(`/post/${id}/comment`);

export const likePostComment = (id) =>
  axiosInstance.post(`/post/${id}/comment/like`);

export const createPostComment = (id, postComment) =>
  axiosInstance.post(`/post/${id}/comment`, postComment);

export const deletePostComment = (id) =>
  axiosInstance.delete(`/post/${id}/comment`);
