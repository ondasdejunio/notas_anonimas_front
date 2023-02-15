import { axiosInstance } from "../api/axios";

export const getPost = (id) => axiosInstance.get(`/post/${id}`);

export const getPosts = (params) => axiosInstance.get("/post", { params });

export const getPostsByUser = (params) =>
  axiosInstance.get("/post/user", { params });

export const likePost = (id) => axiosInstance.post(`/post/${id}/like`);

export const createPost = (post) => axiosInstance.post("/post", post);

export const deletePost = (id) => axiosInstance.delete(`/post/${id}`);
