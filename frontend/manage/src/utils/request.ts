import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../constants/api";

export const customAxios = axios.create({
  baseURL: BASE_URL
});

const request = {
  get: async (query: string, headers?: AxiosResponse["headers"]) => await customAxios.get(query, { headers }),
  post: async <T>(query: string, data: T, headers?: AxiosResponse["headers"]) =>
    await customAxios.post(query, data, headers),
  patch: async <T>(query: string, data: T, headers?: AxiosResponse["headers"]) =>
    await customAxios.patch(query, data, {
      headers
    }),
  delete: async (query: string, headers?: AxiosResponse["headers"]) => await customAxios.delete(query)
};

export { request };
