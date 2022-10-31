import { api } from "./api";

export const getUser = () => {
  return api.get("/auth/");
};

export const getUserInfo2 = () => {
  return api.get("/auth");
};
