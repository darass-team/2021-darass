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

const request = {
  get: async (query: string) => (await customAxios.get(query)).data,
  post: async <T>(query: string, data: T) => (await customAxios.post(query, data)).data,
  patch: async <T>(query: string, data: T) => (await customAxios.patch(query, data)).data,
  delete: async (query: string) => await customAxios.delete(query)
};

export { request };
