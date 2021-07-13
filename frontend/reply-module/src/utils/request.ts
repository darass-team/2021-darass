import axios from "axios";
import { BASE_URL } from "../constants/api";
import { COOKIE_KEY } from "../constants/cookie";
import { getCookie } from "./cookie";

const customAxios = axios.create({
  baseURL: BASE_URL
});

// TODO: 쿠기가 바뀔 시, 업데이트 되는지 체크
customAxios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(COOKIE_KEY.ATK)}`;
customAxios.defaults.headers.post["Content-Type"] = "application/json";

const request = {
  get: async (query: string) => await customAxios.get(query),
  post: async <T>(query: string, data: T) => await customAxios.post(query, data),
  patch: async <T>(query: string, data: T) => await customAxios.patch(query, data),
  delete: async (query: string) => await customAxios.delete(query)
};

export { request };
