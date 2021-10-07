import { customAxios } from "../customAxios";

jest.mock("../customAxios");

export const request = {
  get: jest.fn().mockImplementation(() => {
    customAxios.get("");
  }),
  post: jest.fn().mockImplementation(() => {
    customAxios.post("", {});
  }),
  patch: jest.fn().mockImplementation(() => {
    customAxios.patch("", {});
  }),
  delete: jest.fn().mockImplementation(() => {
    customAxios.delete("");
  })
};
