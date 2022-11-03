import api from "./api";

// 스터디 스트릭
export const getStrict = async () => {
  const res = await api.get("/study/streak");
  return res;
};

// 스터디 내 활동 현황
export const getMyActivity = async () => {
  const res = await api.get("/subject/");
  return res;
};

// 스터디 탈퇴/추방
export const quitStudy = async (userId: number) => {
  const res = await api.delete(`/study/quit?user_id=${userId}`);
  return res;
};

// 스터디 해체
export const deleteStudy = async () => {
  const res = await api.delete(`/study`);
};

// 스터디 랭킹
export const getRank = async () => {
  const res = await api.get("/study/ranking");
  return res;
};
