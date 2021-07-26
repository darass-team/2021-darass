import axios from "axios";
import { BASE_URL } from "../constants/api";
import { COOKIE_KEY } from "../constants/cookie";
import { getCookie } from "./cookie";

const customAxios = axios.create({
  baseURL: BASE_URL
});

customAxios.interceptors.request.use(config => {
  const accessToken = getCookie(COOKIE_KEY.ATK);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

customAxios.interceptors.response.use(
  response => response,
  error => error.response
);

export const request = {
  get: async (query: string) => await customAxios.get(query),
  post: async <T>(query: string, data: T) => await customAxios.post(query, data),
  patch: async <T>(query: string, data: T) => await customAxios.patch(query, data),
  delete: async (query: string) => await customAxios.delete(query)
};
