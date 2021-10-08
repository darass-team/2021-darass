import { AxiosResponse } from "axios";
import { customAxios } from "./customAxios";

const request = {
  get: async (query: string, headers?: AxiosResponse["headers"]) =>
    await customAxios.get(query, { ...headers, withCredentials: true }),
  post: async <T>(query: string, data: T, headers?: AxiosResponse["headers"]) =>
    await customAxios.post(query, data, { ...headers, withCredentials: true }),
  patch: async <T>(query: string, data: T, headers?: AxiosResponse["headers"]) =>
    await customAxios.patch(query, data, { ...headers, withCredentials: true }),
  delete: async (query: string, headers?: AxiosResponse["headers"]) =>
    await customAxios.delete(query, { ...headers, withCredentials: true })
};

export { request };
