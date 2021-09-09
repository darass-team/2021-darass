import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../constants/api";
// import { COOKIE_KEY } from "../constants/cookie";
// import { getCookie } from "./cookie";

export const customAxios = axios.create({
  baseURL: BASE_URL
});

// customAxios.interceptors.request.use(config => {
//   const accessToken = getCookie(COOKIE_KEY.ATK);

//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return config;
// });

const request = {
  get: async (query: string, headers?: AxiosResponse["headers"]) => await customAxios.get(query, { headers }),
  post: async <T>(query: string, data: T, headers?: AxiosResponse["headers"]) =>
    await customAxios.post(query, data, headers),
  patch: async <T>(query: string, data: T, headers?: AxiosResponse["headers"]) =>
    await customAxios.patch(query, data, {
      headers
    }),
  delete: async (query: string) => await customAxios.delete(query)
};

export { request };
