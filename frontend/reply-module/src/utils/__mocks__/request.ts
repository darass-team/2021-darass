import { customAxios } from "../request";

jest.mock("../request");

jest.spyOn(customAxios, "get");
jest.spyOn(customAxios, "post");
jest.spyOn(customAxios, "patch");
jest.spyOn(customAxios, "delete");

export const request = {
  get: jest.fn(() => {
    customAxios.get("");
  }),
  post: jest.fn(() => {
    customAxios.post("", {});
  }),
  patch: jest.fn(() => {
    customAxios.patch("", {});
  }),
  delete: jest.fn(() => {
    customAxios.delete("");
  })
};
