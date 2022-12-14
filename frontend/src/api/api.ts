import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getAccessToken } from "../utils/functions";

const url = process.env.REACT_APP_API_URL;

export const api: AxiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json"
  }
});

// api 요청 인터셉터
api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
  }
  return config;
});

// // api 응답 인터셉터
// api.interceptors.response.use(
//   // 성공 응답일 때,
//   response => {
//     return response;
//   },

//   // 실패 응답일 때,
//   async error => {
//     // A) 토큰 만료 이슈인 경우
//     if (error.response.data?.message.includes("만료")) {
//       // a) 갱신 요청
//       const { data, status } = await api.post("/auth/refresh", {});
//       if (status === 201) {
//         localStorage.setItem("token", data.accessToken);

//         // 헤더 변경 후 다시 쏘기
//         const originalRequest = error.config;
//         axios.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
//         originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;

//         return await axios(originalRequest);
//       }
//     }
//     // B) 토큰 이슈 아닌 경우 및 refreshToken 만료 이슈
//     return Promise.reject(error);
//   }
// );

export default api;
