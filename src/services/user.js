import { axiosInstance } from "../api/axios";

export const createUser = (user) => axiosInstance.post("/user/register", user);

export const loginUser = (user) => axiosInstance.post("/login", user);

export const updateUser = (user) => axiosInstance.put("/user/update", user);
