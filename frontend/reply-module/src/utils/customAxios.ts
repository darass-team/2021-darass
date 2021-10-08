import { BASE_URL } from "@/constants/api";
import axios from "axios";

export const customAxios = axios.create({
  baseURL: BASE_URL
});

export const axiosBearerOption = {
  _interceptorId: -1,

  setAccessToken(_accessToken: string) {
    this._interceptorId = customAxios.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${_accessToken}`;

      return config;
    });
  },
  clear() {
    customAxios.interceptors.request.eject(this._interceptorId);
  }
};
