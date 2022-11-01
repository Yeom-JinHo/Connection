import { api } from "./api";

export const getRecommend = async () => {
  const res = await api.get("/problem/recommend");
  return res;
};

export const searchProblem = async (keyword: string) => {
  const res = await api.get(`/problem/search?keyword=${keyword}`);
  return res;
};
